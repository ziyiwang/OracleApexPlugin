// Run webpack over this entry point to produce a JS file
// that provides the exported components via react-interop
// For this example, output will be 'PlanNetAlertCall-packed.js'

/* eslint-disable react/no-multi-comp */

import PropTypes from 'prop-types';
import React from 'react';
import {connect, Provider} from 'react-redux';
import {applyMiddleware, bindActionCreators, createStore} from 'redux';
import {createCallback, exportCallbacks, exportComponents} from '../src';

function applyFluctuation(stocks) {
    const newStocks = {};

    Object.keys(stocks).forEach((AlertMsg) => {
        // Apply a fluctuation of +/- 10%
        const fluctuation = (Math.random() - 0.5) * 0.1;

        newStocks[AlertMsg] = stocks[AlertMsg] + (stocks[AlertMsg] * fluctuation);
    });

    return newStocks;
}``

function reducer(state = {}, action) {
    switch (action.type) {
        case 'ACTIONA':
            const {price, AlertMsg} = action;

            return {
                ...state,
                [AlertMsg]: price
            };

        case 'ACTIONB':
            return applyFluctuation(state);

        default:
            return state;
    }
}

function setPlanNetAlert(AlertMsg, price) {
    return {
        type: 'ACTIONA',
        AlertMsg,
        price
    };
}

function fluctuatePlanNetAlerts() {
    return {
        type: 'ACTIONB'
    };
}

// PlanNetAlert is a sample React component that we want to export
// AlertMsg comes from props, price come from state
const PlanNetAlert = ({AlertMsg, price}) => (
    <div>
        <label>random PlanNet Alerts</label>
        <strong>{AlertMsg}</strong>
    </div>
);

PlanNetAlert.propTypes = {
    price: PropTypes.number,
    AlertMsg: PropTypes.string.isRequired
};

const mapPlanNetAlertStateToProps = (state, {AlertMsg}) => ({
    AlertMsg,
    price: state[AlertMsg]
});

const ConnectedPlanNetAlert = connect(mapPlanNetAlertStateToProps)(PlanNetAlert);

const mapPlanNetAlertsStateToProps = (state) => ({
    AlertMsgs: Object.keys(state)
});

// Create a callback pub/sub instance

const store = createStore(
    reducer,
    {
        somerandomStore: 103
    }
);

// Fluctuate stock prices every 5 seconds

// Generate the exported components
const exportedComponents = exportComponents(
    {
        PlanNetAlert: ConnectedPlanNetAlert
    },
    Provider,// container
    {store} // container props
);//export default function exportComponents(componentTypes, Container, containerProps) {, export componenet pages

// Use bindActionCreators to be ready to export the action creators
//const exportedActions = bindActionCreators({setPlanNetAlert}, store.dispatch);

// Generate the exported callbacks
//const exportedCallbacks = exportCallbacks({onPriceChanged});

// The exported components, actions, and callbacks can
// be made available globally for consumers to reference
window.PlanNetAlertCall = {
    ...exportedComponents
//    ...exportedActions,
//    ...exportedCallbacks
};
