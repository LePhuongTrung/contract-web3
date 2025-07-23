import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DeployDemo", (m) => {
    const deployDemo = m.contract("HelloWorld", []);
    return { deployDemo };
});