# Simulator purchase testing

`DreamAlchemyLocal.storekit` contains local monthly and annual subscriptions with
the same product IDs used by RevenueCat. Prices are test fixtures, not a source of
truth for production pricing. Transactions made with this configuration do not
charge a card.

1. Generate/install the native iOS project if needed (`npm run ios`).
2. Run `node scripts/setup-storekit.js` after generating the native project.
3. Open `ios/DreamAlchemy.xcworkspace` in Xcode. Select **DreamAlchemy-StoreKit**
   and the **Dream Alchemy iPhone** simulator.
4. In Edit Scheme > Run > Options, confirm the StoreKit configuration resolves to
   `storekit/DreamAlchemyLocal.storekit`.
5. Open the catalog in Xcode and use **Editor > Save Public Certificate**.
   Upload that public certificate in RevenueCat under the iOS app's
   **StoreKit testing framework** settings. Do not upload a private key.
6. Start Metro with `npx expo start --dev-client --localhost --port 8081`, then
   use **Product > Run** in Xcode. Launching via the Expo CLI alone does not
   activate the scheme's StoreKit configuration.
7. Test purchase, app restart, restore, and plan changes. Verify the entitlement
   in the app and the sandbox transaction in RevenueCat before calling the flow
   validated. Xcode's transaction manager supports further local scenarios.

Use the normal **DreamAlchemy** scheme to return to Apple's store environment.
Local StoreKit tests do not cover every production App Store/server-notification
behavior. No TestFlight install is required for this local workflow.

Reference: https://www.revenuecat.com/docs/test-and-launch/sandbox/apple-app-store
