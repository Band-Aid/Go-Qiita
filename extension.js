//import { create } from 'domain';

// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const QiitaAPI = require('./qiita-api')
const Qiita = new QiitaAPI
const path = require('path')
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

        let firstLine = editor.document.lineAt(1);
        let lastLine = editor.document.lineAt(editor.document.lineCount - 1);
        let textrange = new vscode.Range(1, firstLine.range.start.character, editor.document.lineCount - 1, lastLine.range.end.character);
        let body = editor.document.getText(textrange);
        let title = path.basename(editor.document.fileName);
        let options = editor.document.getText(new vscode.Range(0, 0, 1, firstLine.range.end.character))
        console.log(options)
        if (!title.includes('.md')) {
            vscode.window.showInformationMessage('please save and name your file with a .md extension');
        }
        else {
            var uploadtitle = title.replace(".md", "")
            Qiita.post(body, uploadtitle, JSON.parse(options))
        }

        //vscode.window.showInformationMessage(text+ ' ' + title);

    })

    let createTemplate = vscode.commands.registerCommand('extension.createTemplate', function () {
        let document = vscode.window.activeTextEditor
        let template = { "id": "", "private": true, "tags": [""] }
        if (!createTemplate)
            return; // No open text editor
        document.edit((builder) => {
            let startPos = document.document.positionAt(0)
            builder.insert(startPos, JSON.stringify(template) + '\n')
        })
    })

    let fix = vscode.commands.registerCommand('extension.update', function () {
        let article = vscode.window.activeTextEditor
        let firstLine = article.document.lineAt(1);
        let lastLine = article.document.lineAt(article.document.lineCount - 1);
        let textrange = new vscode.Range(1, firstLine.range.start.character, article.document.lineCount - 1, lastLine.range.end.character);
        let body = article.document.getText(textrange);
        let title = path.basename(article.document.fileName);
        var uploadtitle = title.replace(".md", "")
        let tagline = article.document.lineAt(1);
        let tags = article.document.getText(new vscode.Range(0, 0, 1, tagline.range.end.character))
        let options = JSON.parse(tags)
        Qiita.patch(body, uploadtitle, options)
    })

    context.subscriptions.push(launch)
    context.subscriptions.push(createTemplate)
    context.subscriptions.push(upload)
    context.subscriptions.push(fix)

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {
}
exports.deactivate = deactivate;