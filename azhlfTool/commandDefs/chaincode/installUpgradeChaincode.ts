import { Argv } from "yargs";
import { ChaincodeOperations } from "../../commandHandlers/chaincode-ops";
import * as Client from "fabric-client";

const chaincodeTypes: Client.ChaincodeType[] = ["golang", "java", "node"];

interface Arguments {
    channel: string;
    name: string;
    version: string;
    path: string;
    language: string;
    func?: string;
    args?: string[];
    organization: string;
    userName: string;
    privateCollection?: string;
    metadataPath?: string;

}

export const command = "install_upgrade";
export const desc = "Install and update chaincode to the application channel. Should be called with peer.";
export const builder = (yargs: Argv): Arguments =>
    yargs
        .group(["channel", "name", "version", "organization", "userName","path","language"], "Required:")
        .group(["func", "args","privateCollection"], "Optional:")
        .option("channel", { demandOption: true, requiresArg: true, type: "string", description: "Channel name.", alias: "c" })
        .option("name", { demandOption: true, requiresArg: true, type: "string", description: "Chaincode identifier.", alias: "n" })
        .option("version", { demandOption: true, requiresArg: true, type: "string", description: "Chaincode version.", alias: "v" })
        .option("path", { demandOption: true, requiresArg: true, type: "string", description: "Path to the source code.", alias: "p" })
        .option("language", { default: "golang", requiresArg: true, type: "string", choices: chaincodeTypes, description: "Chaincode language.", alias: "l" })
        .option("func", { type: "string", requiresArg: true, description: "Function to be invoked.", alias: "f" })
        .option("args", { type: "array", array: true, string: true, description: "Arguments.", alias: "a" })
        .option("organization", { demandOption: true, requiresArg: true, type: "string", description: "Organization name which issues request.", alias: "o" })
        .option("userName", { demandOption: true, requiresArg: true, type: "string", description: "User name who issues request.", alias: "u" })
        .option("privateCollection", { type: "string", requiresArg: true, description: "path to private collection definition.", alias: "P" })
        .option("metadataPath", { type: "string", requiresArg: true, description: "path to meta data definition.", alias: "m" })

        .argv;

export const handler = async (argv: Arguments): Promise<void> => {
    try {
        await new ChaincodeOperations().InstallAndUpgradeChaincode(
            argv.channel,
            argv.name,
            argv.version,
            argv.path,
            argv.language as Client.ChaincodeType,
            argv.func,
            argv.args,
            argv.organization,
            argv.userName,
            argv.privateCollection,
            argv.metadataPath
        );
    } catch (error) {
        console.error(error);
    }
};
