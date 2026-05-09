//import { create } from 'domain';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const QiitaAPI = require('./qiita-api')
const Qiita = new QiitaAPI
const path = require('path')
const { parseOptions, stringifyOptions } = require('./json-handler')

function readArticle(editor) {
    if (!editor) {
        return;
    }

    let firstLine = editor.document.lineAt(1);
    let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
    let textrange = new vscode.Range(1, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
    let body = editor.document.getText(textrange);
    let title = path.basename(editor.document.fileName);
    let options = parseOptions(editor.document.lineAt(0).text);

    return { body, title, options };
}

function showJsonError(error) {
    vscode.window.showErrorMessage(`invalid Qiita metadata JSON: ${error.message}`)
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {

    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    let launch = vscode.commands.registerCommand('extension.launch', function () {
        console.log('Congratulations, your extension "go-qiita" is now active!');
    })
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json

    let upload = vscode.commands.registerCommand('extension.post', function () {
        // The code you place here will be executed every time your command is executed
        let editor = vscode.window.activeTextEditor;
        if (!editor)
            return; // No open text editor

        let article
        try {
            article = readArticle(editor)
        } catch (error) {
            showJsonError(error)
            return
        }

        if (!article.title.includes('.md')) {
            vscode.window.showInformationMessage('please save and name your file with a .md extension');
        }
        else {
            let uploadtitle = article.title.replace(".md", "")
            Qiita.post(article.body, uploadtitle, article.options)
        }

        //vscode.window.showInformationMessage(text+ ' ' + title);

    })

    let createTemplate = vscode.commands.registerCommand('extension.createTemplate', function () {
        let document = vscode.window.activeTextEditor
        if (!document)
            return; // No open text editor
        document.edit((builder) => {
            let startPos = document.document.positionAt(0)
            builder.insert(startPos, stringifyOptions() + '\n')
        })
    })

    let update = vscode.commands.registerCommand('extension.update', function () {
        let article = vscode.window.activeTextEditor
        if (!article)
            return; // No open text editor

        try {
            article = readArticle(article)
        } catch (error) {
            showJsonError(error)
            return
        }

        let uploadtitle = article.title.replace(".md", "")
        Qiita.patch(article.body, uploadtitle, article.options)
    })

    let open = vscode.commands.registerCommand('extension.open',function(){
        let article = vscode.window.activeTextEditor
        if (!article)
            return; // No open text editor

        let options
        try {
            options = parseOptions(article.document.lineAt(0).text)
        } catch (error) {
            showJsonError(error)
            return
        }

        if(!options.id)
            return
        else
        vscode.commands.executeCommand('vscode.open', vscode.Uri.parse('https://qiita.com/items/'+options.id))
    })


    context.subscriptions.push(launch)
    context.subscriptions.push(createTemplate)
    context.subscriptions.push(upload)
    context.subscriptions.push(update)
    context.subscriptions.push(open)

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;
