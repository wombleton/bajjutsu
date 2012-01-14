fs     = require 'fs'
{exec} = require 'child_process'

files = [
  'views/Technique'
  'views/Charge'
  'views/Health'
  'views/Screen'
  'app'
]

task 'build', 'Build single application file from source files', ->
  appContents = new Array remaining = files.length
  for file, index in files then do (file, index) ->
    fs.readFile "js/#{file}.coffee", 'utf8', (err, fileContents) ->
      throw err if err
      appContents[index] = fileContents
      process() if --remaining is 0
  process = ->
    fs.writeFile 'js/bajjutsu.coffee', appContents.join('\n\n'), 'utf8', (err) ->
      throw err if err
      exec 'coffee --compile js/bajjutsu.coffee', (err, stdout, stderr) ->
        throw err if err
        console.log stdout + stderr
        exec 'uglifyjs -o js/bajjutsu.min.js js/bajjutsu.js', (err, stdout, stderr) ->
          throw err if err
          console.log stdout + stderr
          console.log 'Done.'
        fs.unlink 'js/bajjutsu.coffee', (err) ->
          throw err if err
