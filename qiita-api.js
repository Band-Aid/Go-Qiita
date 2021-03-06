const vscode = require('vscode');
const Client = require('node-rest-client').Client
const client = new Client()
const accessToken = ''
const baseurl = 'https://qiita.com/api/v2/'
const settings = require('./qiita.json')
//const QiitaRequest = require('./api-manager')

class QiitaAPI {
  constructor() {
    this.headers = {
      "Authorization": "Bearer " + settings.QiitaAccessToken,
      "Content-Type": "application/json"
    }
  }

  post(body, title, options) {
    let tags = []
    options.tags.forEach(function (name) { tags.push({ name: name }) })
    let args = {
      data:
      {
        "body": body,
        "coediting": false,
        "gist": false,
        "group_url_name": "dev",
        "private": options.private,
        "tags": tags,
        "title": title,
        "tweet": options.tweet
      },
      headers: this.headers
    }
    console.log(args)
    let req = client.post(baseurl + 'items', args, function (data, response) {
      if (response.statusCode == '201') {
        vscode.window.showInformationMessage('hooray! successfully uploaded')
        let article = vscode.window.activeTextEditor

        let template = { "id": data.id, "private": data.private, "tags": options.tags }
        article.edit((builder) => {
          // let startPos = article.document.positionAt(0)
          builder.replace(new vscode.Range(0, 0, 1, 0), JSON.stringify(template) + '\n')
        })
      }
      else if (response.statusCode >= '400') {
        vscode.window.showErrorMessage(`failed to upload with error ${response.statusCode} ${data.message}`)
      }
    })
    console.log("logging reponse ")
    console.log(req)
  }

  patch(body, title, options) {
    let tags = []
    options.tags.forEach(function (name) { tags.push({ name: name }) })
    let args = {
      data:
      {
        "body": body,
        "coediting": false,
        "gist": false,
        "group_url_name": "dev",
        "private": options.private,
        "tags": tags,
        "title": title,
        "tweet": options.tweet
      },
      headers: this.headers
    }

    client.patch(baseurl + 'items/' + options.id, args, function (data, response) {
      if (response.statusCode == '200') {
        vscode.window.showInformationMessage('hooray! successfully uploaded')
      }
      else if (response.statusCode >= '400') {
        vscode.window.showErrorMessage(`failed to upload with error ${response.statusCode} ${data.message}`)
      }
    })
  }
}

module.exports = QiitaAPI;
