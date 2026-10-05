/* global __dirname */
// Re-run after Expo regenerates ios/. The normal scheme remains unchanged.
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const schemes = path.join(root, 'ios/DreamAlchemy.xcodeproj/xcshareddata/xcschemes');
const source = path.join(schemes, 'DreamAlchemy.xcscheme');
if (!fs.existsSync(source)) {
  throw new Error('Generate the iOS project first with npx expo prebuild --platform ios.');
}
const scheme = fs.readFileSync(source, 'utf8');
if (!scheme.includes('</LaunchAction>')) {
  throw new Error('Cannot locate the launch action in the native scheme.');
}
const configured = scheme.replace(
  '</LaunchAction>',
  '   <StoreKitConfigurationFileReference identifier="../../storekit/DreamAlchemyLocal.storekit"/>\n   </LaunchAction>'
);
const workspace = path.join(root, 'ios/DreamAlchemy.xcworkspace/contents.xcworkspacedata');
const contents = fs.readFileSync(workspace, 'utf8');
const catalogReference = 'group:../storekit/DreamAlchemyLocal.storekit';
if (!contents.includes(catalogReference)) {
  fs.writeFileSync(workspace, contents.replace('</Workspace>',
    `   <FileRef location="${catalogReference}"></FileRef>\n</Workspace>`));
}
fs.writeFileSync(path.join(schemes, 'DreamAlchemy-StoreKit.xcscheme'), configured);
console.log('Created DreamAlchemy-StoreKit. Select it in Xcode and use Product > Run.');
