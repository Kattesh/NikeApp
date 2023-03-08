import {StatusBar} from 'expo-status-bar';
import Navigation from "./src/navigation";
import {Provider} from 'react-redux'
import {store} from "./src/store";
import {StripeProvider} from "@stripe/stripe-react-native/src/components/StripeProvider";

const STRIPE_KEY = 'pk_test_51MjDGFCJ9H2IxhzuE3Hu838hBOyAGjKlRWNEHSMoDAyvVJb5sxOSNJasdNAPr0exo0Po3oLO0tSOrT5FVq9V2BpG00krxSLogJ'

export default function App() {
    return (
        <Provider store={store}>
            {/*Your Publishable Key*/}
            <StripeProvider publishableKey={STRIPE_KEY}>
                <Navigation/>
            </StripeProvider>

            <StatusBar style="auto"/>
        </Provider>
    );
}


