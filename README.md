# This is a live project
> https://codabool.com

This is a portfolio site to show my skills, projects and to keep active blogs about my work. Please take a look

# Developer Notes
## Todo
- finish 2 new blogs
- performance optimization
- SEO 

### edits to node_modules
#### terminal-in-react
- Removal of 630px for fullscreen
> files: styled-elements.js.map, terminal-react.js

show - show the msg (lib/js/components/Terminal/index.js)
clear - clear the screen (lib/js/components/Terminal/index.js)
help - list all the commands (lib/js/components/Terminal/index.js)
vi - Open a file to be edited (lib/index.js)
help printout @ TODO (lib/js/components/Terminal/index.js)

### outside of node_modules
- in global.css added
`CSS
.sc-EHOje, .dLVStj, .terminal-base, .blCJWW {
    max-width: 100% !important;
    max-height: 100% !important;
    width: 100%;
    height: 100%;
}
`

# npm packages to look into to rewrite md
- @next/mdx
- @mdx-js/loader
