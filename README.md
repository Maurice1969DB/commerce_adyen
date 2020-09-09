# commerce_adyen
Patch for Commerce Adyen for Drupal 8 to include Adyen Drop-in

Adyen introduced Web Components and Dropin as a substitute for HPP redirects. Components (payment methods) are rendered on site. 
This creates a cleaner interface. This patch renders the components at the payment pane. 
An API-key and a merchant account need to be filled in to the configuration form.
<a href="https://docs.adyen.com/checkout/drop-in-web">More on Dropin</a>
This is a start of this implementation. Still much work needs to be done.
Looking for a co-worker who is also working on this module. Let me know!


Remaining tasks

- The handling of more than the 'Authorized' result code needs to be implemented.
- Not all payment methods are implemented. Only credit card and iDeal.
- Many more work still to be done. But this is a start.

User interface changes
On the payment pane it is now possible to show all payment methods.
