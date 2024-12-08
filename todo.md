# TODO (Mos Burgers)

- Create home page. (no idea, maybe a dashboard with current logged-in admin's details. IDK)

- Add Search input (It filters the food items that have the input text as part of the item's name. Useful when the shop has a large number of food items. Because the shop is keeping growing). ✔ ✔ ✔

- Add select dropdown that has categories as options to filter food items by category. So, the cashier can easily see specific types of food. (The same reason as the above tip). ✔ ✔ ✔

- Create a better indicator to show if the food card is already in the cart. (Currently, it gets grayscale and scales down, can be recognized. But not the best way).

- The design and theme are great. No need for future changes to the UI. ✔ ✔ ✔

- Add User preferences for individual admins. (The application appearance and target settings will be changed based on the admin who logged in.)

- Add settings to give full control to the above tip.

- Create an **Add Items** section to add new food items.

- Currently, when placing the order there is no method to select the customer or add a new one. Add this customer management thing in **Place Order** and maybe create a completely different section to manage customers. ✔ ✔ ✔

- Report generation part is missing. Still have no idea. First thing is to plan how to implement this.

- Maybe some animations. There are some transitions. But no animations yet. (Cleanup, at the very end).

- Improve server side to hold today's orders as temporary (RAM, no database). The purpose is to calculate best-selling food items and even food packs, so, in the second half of the day it will be easy for the admin to communicate with the customer using the data. (Like what is the best package for today).

- Create a system to maintain food packages. Different section. (Maybe not implement. Like not very useful).

- The current database system is a bit weird and not very nice. It's also kinda small scale. Improve the database or rebuild it.

- Create an admin login system. (Not through this app. Another site).  

- On `content.js` the `init` function -> should I keep the style and script loading like that (load one by one, wait until first resource load to load second one), or just call each loads at once and make another method to check if the all resources load and do the rest. The second method will propably make loading fast. But!!!

- A menu that admins can see today all orders and old order as day by day. (Orders, Full order detail with customer detail, Receipts)

- Add delete button to cart window, so cashier can easily erace current order without setting each placed item's quantity to 0.
