import PageContent from '@/components/PageContent';
import { useUser } from '@/context/UserContext';
import { getCookieFromContext } from '@/utils/cookies';
import { useRef } from 'react';

interface Param {
  name: string;
  required: boolean;
}

interface Command {
  description: string;
  params?: Param[];
  commands?: Commands;
  action: () => void;
}

interface Commands {
  [key: string]: Command;
}

export default function Admin() {
  const { user, isLoggedIn } = useUser();

  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  if (!isLoggedIn) {
    return null;
  }

  const commands: Commands = {
    help: {
      description: 'Displays a list of available commands.',
      action: () => {
        terminalRef.current!.insertAdjacentHTML('beforeend', '<code>Available commands:</code>');

        Object.keys(commands).forEach((command) => {
          terminalRef.current!.insertAdjacentHTML('beforeend', `<code>${command} - ${commands[command].description}</code>`);
        });
      }
    },
    whoami: {
      description: 'Who am I?',
      action: () => {
        terminalRef.current!.insertAdjacentHTML('beforeend', `<code>${user.names.global_name}</code>`);
      }
    },
    clear: {
      description: 'Clear the terminal.',
      action: () => {
        terminalRef.current!.innerHTML = '';
      }
    },
    sudo: {
      description: 'Execute a command as another user.',
      commands: {
        rm: {
          description: 'Remove a file.',
          commands: {
            '-rf': {
              description: 'Remove a file forcefully.',
              commands: {
                '/': {
                  description: 'Remove the root directory.',
                  action: () => {
                    terminalRef.current!.insertAdjacentHTML('beforeend', '<code style="color: red;">...</code>');

                    const interval = setInterval(() => {
                      terminalRef.current!.insertAdjacentHTML('beforeend', '<code style="color: red;">...</code>');
                    }, 1000);

                    setTimeout(() => {
                      clearInterval(interval);

                      document.body.innerHTML = '';
                    }, 5000);
                  }
                }
              },
              action: () => {}
            }
          },
          action: () => {}
        }
      },
      action: () => {
        terminalRef.current!.insertAdjacentHTML('beforeend', '<code>doas</code>');
      }
    },
    user: {
      description: 'Display user information.',
      commands: {
        list: {
          description: 'List users.',
          action: () => {
            alert('List users');
          }
        }
      },
      action: () => {}
    },
  };

  const executeCommand = (commandTree: any, args: string[]) => {
    if (args.length === 0) {
      if (commandTree.action) {
        commandTree.action();
      } else {
        terminalRef.current!.insertAdjacentHTML('beforeend', '<code>Command executed but no action defined.</code>');
      }
      return;
    }
  
    const nextCommand = args[0];
    const remainingArgs = args.slice(1);
  
    if (commandTree.commands && commandTree.commands[nextCommand]) {
      executeCommand(commandTree.commands[nextCommand], remainingArgs);
    } else {
      terminalRef.current!.insertAdjacentHTML('beforeend', `<code>\`${nextCommand}\`: Command Not Found</code>`);
    }
  };
  
  const parseCommands = (e: any) => {
    e.preventDefault();
    inputRef.current?.focus();
  
    const input = inputRef.current?.value.trim();
    if (!input) return;
  
    const [mainCommand, ...subCommands] = input.split(' ');
  
    inputRef.current!.value = '';
    terminalRef.current!.insertAdjacentHTML('beforeend', `<code>theclashfruit@crss.cc ~$ <span style="color: white">${input}</span></code>`);
  
    if (commands[mainCommand]) {
      executeCommand(commands[mainCommand], subCommands);
    } else {
      terminalRef.current!.insertAdjacentHTML('beforeend', `<code>\`${mainCommand}\`: Command Not Found</code>`);
    }
  };

  return (  
    <>
      <PageContent>
        <h1>Admin</h1>
        <p>Welcome, {user.names.global_name}!</p>

        <p>What are we doin&apos; today?</p>

        <h2>Terminal</h2>

        <div style={{ background: 'black', color: 'green', border: '1px solid grey', borderRadius: '.5rem', marginBottom: '1rem' }}>
          <div style={{ minHeight: '48ch', maxHeight: '48ch', overflowY: 'scroll', padding: '.5rem', borderTopRightRadius: '.5rem', borderTopLeftRadius: '.5rem', display: 'flex', flexDirection: 'column' }} ref={terminalRef}>
            <code>
              <span style={{ color: 'white' }}>CRSS AdminShell</span> <br />
              <span style={{ color: 'white' }}>Copyright (C) 2024 CRSS. All rights reserved.</span> <br /><br />
              <span style={{ color: 'white' }}>Run `help` for commands.</span> <br />
            </code>
          </div>
          <form style={{ display: 'flex', gap: '.5rem', padding: '.5rem' }} onSubmit={parseCommands}>
            <label htmlFor="prompt">{user.names.username}@crss.cc ~$</label> <input id="prompt" type="text" style={{ flex: '1', background: 'transparent', color: 'white', fontSize: '1em', border: 'none' }} ref={inputRef} />
          </form>
        </div>

        <h2>Your User in JSON Format</h2>

        <p>In case you need it for some reason.</p>

        <pre>
          {JSON.stringify(user, null, 2)}
        </pre>
      </PageContent>
    </>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;

  const cookie     = req.headers.cookie;
  let   isLoggedIn = false;

  if (cookie) {
    const sessionCookie = getCookieFromContext('session', cookie);

    if (sessionCookie) {
      isLoggedIn = true;
    }
  }

  if (!isLoggedIn) {
    return {
      notFound: true,
    };
  }

  return {
    props: {},
  };
}