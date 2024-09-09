import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { Locale, React } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import { kao } from './kaoroll';
import Settings from './components/Settings';
import { ApplicationCommandInputType, ApplicationCommandOptionType, ApplicationCommandType, Command } from 'enmity/api/commands';
import { getByProps } from 'enmity/metro';
import { sendReply } from 'enmity/api/clyde';

function selectRandomElement(arr) {
   // generate a random index based on the length of the array
   const randomIndex = Math.floor(Math.random() * arr.length);

   // return the element at the randomly generated index
   return arr[randomIndex];
}

function good(message: string): string {
   let answer = "";

   answer = message

   answer += " " + selectRandomElement(kao);
   return answer;
}
const Patcher = create('josiauhplugin');

const JosiauhPlugin: Plugin = {
   ...manifest,
   name: "JosiauhPlugin",
   commands: [],

   onStart() {
      const kaoroll: Command = {
         id: "kaoroll",

         name: "kaoroll",
         displayName: "kaoroll",

         description: "Roll random kaomoji!",
         displayDescription: "Roll random kaomoji!",

         type: ApplicationCommandType.Chat,
         inputType: ApplicationCommandInputType.BuiltInText,

         options: [{
            name: "message",
            displayName: "message",
            description: Locale.Messages.COMMAND_SHRUG_MESSAGE_DESCRIPTION,
            displayDescription: Locale.Messages.COMMAND_SHRUG_MESSAGE_DESCRIPTION,
            required: true,
            type: ApplicationCommandOptionType.String
        }],

        execute: async function (args, _msg) {
            return {
               content: good(args[0].value)
            };
        }
      };
      this.commands.push(kaoroll);
   },

   onStop() {
      Patcher.unpatchAll();
      this.commands = [];
   },

   getSettingsPanel({ settings }) {
      return <Settings settings={settings} />;
   }
};

registerPlugin(JosiauhPlugin);
