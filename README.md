# go-qiita README

You can post, update Qiita posts via VSCode

## Requirements

Copy the folder under your local extensions folder:
Windows: %USERPROFILE%\.vscode\extensions
macOS/Linux: $HOME/.vscode/extensions


1. Clone the repository with git clone https://github.com/Band-Aid/Go-Qiita.git
2. Copy the folder to vscode\extensions
3. Install missing components with `npm install`
4. Add your own qiita's access token file qiita.json.

```
{
    "QiitaAccessToken":"xxx"
}
```

5. Restart Vscode
6. The Extension will automatically load if you open a `.md` file. Or you can manually launch by Typing `Qiita: launch`.
7. You can generate a template by executing `Qiita: Template`
8. You can upload your article with the `Qiita: Post` command. (You need at least one tag value, please save the file as .md before posting.
9. Update articles with `Qiita: Update`

## Temaplte values

{"id": "", "private": true, "tags": []}

After posting an article, the qiita's post ID is inserted to the `id` attribute. This is used to update the article with the `qiita-update` command

`Private = true` post artciles as hidden posts, false makes them public. Posts made public can not be hidden posts. (Qiita's limitation

`Tag` value, as its name suggests they are category tags. You need to enclose it with "". Example: ["box", "qiita", "vscode"]

## Features

commands:

- Qiita: Launch
Launch extension

- Qiita: Template
adds template to header

- Qiita: Post
post .md file to Qiita. Needs to be .md file

- Qiita: Update
Updates post.

- Qiita: Open
Open published article in Qiita

**Enjoy!**

# Todo
Updated:

1. Clean up qiita-api.js to be more clean and efficent
2. With the currenty implementation Optional parameters are hard coded. Would be great to make this flexibale.