# go-qiita README

You can post, update Qiita posts via VSCode

## Requirements

Copy the folder under your local extensions folder:
Windows: %USERPROFILE%\.vscode\extensions
macOS/Linux: $HOME/.vscode/extensions


1. Clone the repository with git clone https://github.com/Band-Aid/Go-Qiita.git
2. Copy the folder to vscode\extensions
3. Install missing components with `npm install`
4. Add your own qiita's access token to the const accessToken = '' variable in the `qiita-api.js` file
5. Restart Vscode
6. Type  qiita-launch command. (Initialization of extension)
7. When  qiita-template command is executed, a template is created in the first line of the file. *Described later
8. Please add a new line after the template and start writing articles. Otherwise you can not save, (bug)
9. You can save with the `qiita-post` command. (You need at least one tag value, please save the file as .md before posting.If you type `qiita-post` the tag values will disappear (bug)

## Features 

commands: 

- qiita-launch
Launch extension

- qiita-template
adds template to header

- qiita-post
post .md file to Qiita. Needs to be .md file

- qiita-update
Updates post.


**Enjoy!**

# Todo

1. Clean up qiita-api.js to be more clean and efficent
1. use API-Manager.js for better handing http calls as promise
