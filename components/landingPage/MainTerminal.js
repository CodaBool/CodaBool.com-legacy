
import Container from 'react-bootstrap/Container'
import { useEffect, useState } from 'react'
import DisplayTime from './DisplayTime'
import Morph from './Morph'
import Terminal from 'custom-terminal-in-react'
import ViPlugin from 'terminal-in-react-vi-plugin'
import pseudoFileSystemPlugin from 'terminal-in-react-pseudo-file-system-plugin'
import Fade from 'react-reveal/Fade'
import {progressBar, spinner} from './Type'
import TerminalAnimation from 'react-animated-term'
import SimpleBar from 'simplebar-react'
import { Nav } from 'react-bootstrap'

const FileSystemPlugin = pseudoFileSystemPlugin()

export default function MainTerminal() {
  const [showFakeTerminal, setShowFakeTerminal] = useState(true)
  const [showNav, setShowNav] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShowFakeTerminal(false)
    }, 28000) //22000
    setTimeout(() => {
      setShowNav(true)
    }, 9000)
  }, [])

  return(
    <div id="indexBody">
      {!showFakeTerminal && <Morph />}
      <Fade when={showNav}>
        <div className="nav-group terminalNav">
          <Nav.Link className="text-light text-center" href="/projects">Projects</Nav.Link>
          <Nav.Link className="text-light text-center" href="/blog">Blog</Nav.Link>
          <Nav.Link className="text-light text-center" href="/contact">Contact</Nav.Link>
        </div>
      </Fade>
      <Container>
          <div className="terminalBorder">
            <SimpleBar style={{ maxHeight: 770}}>
              <Fade when={!showFakeTerminal}>
                {!showFakeTerminal && <div id="prompt">
                  <img src="/assets/logos/terminal.gif" />
                  <h2>Terminal</h2>
                  <DisplayTime />
                  <p>Enter "help" for more information.</p>
                </div>}
              </Fade>
              {showFakeTerminal ? 
              <>
                <TerminalAnimation
                  lines={progressBar}
                  interval={5} // interval at which terminal output is updated in milliseconds
                />
                <hr /><hr />
                <TerminalAnimation
                  lines={spinner}
                  interval={5}
                />
              </>
              : 
              <Fade delay={300}>
                <>
                  
                  <Terminal 
                    color='rgb(150, 170, 120)'
                    outputColor='rgb(150, 170, 120)'
                    msg='Welcome Home'
                    backgroundColor='rgba(0, 0, 0, 0)'
                    hideTopBar={true}
                    allowTabs={false}
                    style={{ fontWeight: "bold", fontSize: "1.5em", height: '100%', width: '100%', display: 'block'}}
                    promptSymbol={'$ '}
                    prompt='rgb(150, 170, 120)'
                    plugins={[
                      FileSystemPlugin,
                      {
                        class: ViPlugin,
                        config: {
                          filesystem: FileSystemPlugin.displayName
                        }
                      }
                    ]}
                    descriptions={{ color: false, show: false, clear: false }}
                    shortcuts={{
                      'darwin,win,linux': {
                        'ctrl + l': () => { // TODO: runCommand giving a runCommand is not defined error
                          console.log('Error: failed to clear when pressing ctrl + l')
                          // runCommand('clear') 
                        },
                      },
                    }}
                    commandPassThrough={(cmd, print) => {
                      // do something here
                      print(`Error: ${cmd} command not found. Try typing 'help'`)
                    }}
                    commands={{
                      // EXAMPLE: 'boom': () => 'print statement'
                      'see-projects': () => location.href = '/projects',
                      'see-contact': () => 'Email: CodaBool@pm.me | Twitter: @Coda_Bool',
                      'see-blog': () => location.href = '/blog',
                    }}
                    descriptions={{
                      // EXAMPLE: 'boom': 'des'
                    }}
                  />
                </>
              </Fade>
              }
            </SimpleBar>
          </div>
        <Fade opposite when={showFakeTerminal}>
          <div className="text-center fixed-bottom" onClick={() => {setShowFakeTerminal(false); setShowNav(true)}}>
            {showFakeTerminal && <p>Click here to skip</p>}
          </div>
        </Fade>
      </Container>
    </div>
  )
}