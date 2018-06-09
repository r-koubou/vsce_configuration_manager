/* =========================================================================

    ConfigurationManager.ts
    Copyright(c) R-Koubou

    [License]
    MIT

   ======================================================================== */

   import * as vscode from 'vscode';

   /**
    * Utility of read user configuration value from your vsce program.
    */
   export class ConfigurationManager
   {
       /**
        * ctor
        */
       private constructor(){}

       /**
        * Get a user configuration value
        */
       static getConfig<T>( section: string, key:string, defaultValue:T ): T
       {
           let ret:T = defaultValue;
           ConfigurationManager.getConfigComplex( section, key, defaultValue, (v,u)=>{
               ret = v;
           });
           return ret;
       }

       /**
        * Get a user configuration value
        */
       static getConfigComplex<T>( section: string, key:string, defaultValue:T, callback: ( value:T, userDefined:boolean)=>void ): void
       {
           let configuration: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration( section );
           let value:T = defaultValue;
           let userDefined: boolean = false;
           let inspect = configuration.inspect<T>( key );

           if( ! configuration )
           {
               callback( defaultValue, userDefined );
               return;
           }

           if( inspect )
           {
               if( inspect.workspaceValue !== undefined && inspect.workspaceValue !== null )
               {
                   value       = inspect.workspaceValue;
                   userDefined = true;
               }
               else if( inspect.globalValue !== undefined && inspect.globalValue !== null )
               {
                   value = inspect.globalValue;
               }
           }
           callback( value, userDefined );
       }
   }
