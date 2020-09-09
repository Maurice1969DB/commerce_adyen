(function ($, Drupal, drupalSettings) {
  'use strict';

  function makePayment(data){
    return Promise.resolve($.ajax({
      type: 'POST',
      dataType: 'json',
      url: "/paymentmethods",
      data: JSON.stringify(data),
    }));
  }

  function makeDetailsCall(data)
  {
    return Promise.resolve(
      $.ajax({
          type: 'POST',
          dataType: 'json',
          url: "/paymentdetailsmethods",
          data: JSON.stringify(data),
        }
      )
    );
  }

  function showFinalResult(response)
  {

  }

  Drupal.behaviors.commerceAdyen = {
    attach: function (context) {
      let data = drupalSettings.commerce_adyen;

      $(context).find('#dropin-container').once().each(function () {
        const configuration = {
          paymentMethodsResponse: data,
          originKey:"pub.v2.8215942018260198.aHR0cDovL2IyMDJhMDBjNWUxYS5uZ3Jvay5pbw.rHIUiLVr_FdYhh2CujM6gaaJqE5d4EpEB7PAtNIwcXY",
          locale: "nl-NL",
          environment: "test",
          onSubmit: (state, dropin) => {
            makePayment(state.data)
              .then(response => {
                if (response.action) {
                  console.log(response);
                  dropin.handleAction(response.action);
                } else {
                  console.log(response);
                  showFinalResult(response);
                }
              })
              .catch(error => {
                throw Error(error);
              });
          },
          onAdditionalDetails: (state, dropin) => {
            makeDetailsCall(state.data)
              .then(response => {
                if (response.action) {
                  dropin.handleAction(response.action);
                } else {
                  showFinalResult(response);
                }
              })
              .catch(error => {
                throw Error(error);
              });
          },
        };
          const checkout = new AdyenCheckout(configuration);
          const dropin = checkout.create('dropin').mount('#dropin-container');
      });
    }
  };
}(jQuery, Drupal, drupalSettings));
