import React, { useEffect, useRef } from 'react';
import { invoke } from "@tauri-apps/api/tauri";
import { Terminal as XTerm } from 'xterm';
import 'xterm/css/xterm.css'; // Import xterm.css to style the terminal
import { clipboard } from '@tauri-apps/api';

const Terminal: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null); // Create a ref for the terminal container
  let input = ''; // Use a local variable to track the current input

  // Function to simulate command execution
  async function executeCommand (command: string) {
    return await invoke("run_query", { q: command })
  };  

  useEffect(() => {
    const terminal = new XTerm({
      // set the line width to 80 characters
      cols: 84,
      // cols: 1000,
      cursorBlink: true, // Show the cursor blinking
      fontSize: 14, // Set the font size for the terminal
      theme: {
        background: 'rgb(63, 63, 70)', // Set the terminal background color
      },

    }); // Instantiate a new terminal instance

    if (terminalRef.current) {
      terminal.open(terminalRef.current); // Attach the terminal to the div container
    }

    terminal.onKey(function ({ domEvent }) {
      const key = domEvent;

      switch (key.code) {
        case 'Enter':
          terminal.writeln('');
          executeCommand(input).then((result: string) => {
            terminal.writeln(result);
          });
          input = ''; // Reset the input
          break;
        case 'Backspace':
          if (input.length > 0) {
            input = input.slice(0, -1); // Remove the last character
            terminal.write('\b \b'); // Move cursor back and erase the character
          }
          break;
        default:
          input += key; // Accumulate the input
          terminal.write(key.key);
          break;
      }
    });

    terminal.attachCustomKeyEventHandler((key: KeyboardEvent) => {
      // console.log(key.type, key.code);
      if (key.type == 'keypress' && key.metaKey) {
        switch (key.code) {
          case 'KeyC':
            clipboard.writeText(input);
            return false;
          case 'KeyV':
            clipboard.readText().then((text) => {
              if (text === null) return;
              input += text;
              terminal.write(text);
            });
            return false;
        }
      }

      return true;
    });

    terminal.writeln('welcome to iroh-duck\n'); // Example command to display in the terminal
    terminal.write('> ');

    return () => {
      terminal.dispose(); // Clean up the terminal instance on component unmount
    };
  }, []);


  return <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />;
};

export default Terminal;
