# Apartment Management Portal
### Apartment Management Portal for residents and office workers (managers) which was motivated and referenced by RENTCafé
### Checkout live app here : [[For residents]]( http://apt-client-resident.s3-website.us-east-2.amazonaws.com) [[For managers]](http://apt-client-manager2.s3-website.us-east-2.amazonaws.com)
### Click [[HERE]](https://github.com/sdymj84/apt-client) for github address of Resident app
### Click [[HERE]](https://github.com/sdymj84/apt-client-manager) for github address of Manager app
### Click [[HERE]](https://github.com/sdymj84/apt-api) for github address of Server code
---

## Skills
- React, React Router
- Serverless framework for managing AWS
- AWS Amplify to use AWS services from client
- AWS : DynamoDB, Cognito, S3, Lambda, API Gateway, CloudWatch
- Design : react-bootstrap, styled-components
- ETC : moment, react-datepicker, react-collapsing-table, react-icons, etc.
---

## App Details
### Data Modeling
- 4 Database tables : aparts / residents / maintanaces / payments
- Aparts :
    - Apart info (id, address, price, ..)
    - Resident list
    - Lease data
    - Autopay data
    - Floor plan
- Residents :
    - Info like name, phone, ..
    - Emergency Contact
    - Vehicles
    - Payment info
- Payments :
    - Apart ID, transaction time, title, charge, payment, balance
- Maintanances :
    - Number of info for the issue, attachment

### Move in and out flow
- Manager add resident on the system with all personal info
- Resident get invitation email and redirect to change password
- Manager can edit some apart info
- Resident can edit some resident info
- Manager update resident's moveout date > Fee applied if it's earlier than lease end date
- Check everyday if any resident reached 60 days before move out without confirming move out date > system automatically postpone move out date
- Manager delete resident once moved out

### Payment flow
- Rent and other fees applied on the 1st day of each month automatically by CloudWatch
- Resident can set autopay or pay manually
- When confirming early move out, fee gets added to payments

### Maintanance flow
- Resident post request
- Manager see open requests counts on home page
- Manager set request status to "In Progress" or "Complete" (Completed request doesn't show)
- Maintanance requests is sorted by created time and priority

### Announcement
- Manager make announcement via "Announcement" menu
- Manager can choose which unit to be announced by unit number or filter like who has pet
- Resident see announcement on home page and can dismiss (new announcement will show up again)

### Other details
- Contain all logic and style in each single component file using styled-components
- Deployed on AWS
---

## Notes
- e.target.type === "checkbox" ? e.target.checked : e.target.value
- e.persist() - fix Synthetic Events error

- When adding resident to apart, what info should I add besides id?
  Adding resident process
    - GET apart on apart check
    - POST resident on form submit
    - PUT apart on form submit
- When uknown 500 error occur
  1. event.pathParameters.abc : abc is the same name as you set in aws?


- Error : Cancel All Subscriptions and Asyncs in the componentWillUnmount
    - Error occurs when trying to setState when component is unmounted. solution is to use "_isMounted" property
    1. this._isMounted = false on componentWillUnmount
    2. this._isMounted = true on componentDidMount
    3. and do setState only when isMounted is true

- Link / Button order : if vice versa, link doesn't work and link style is applied
  ```
  <Link to='/somewhere'>
    <Button>CLICK</Button>
  </Link>
  ```
---

## Presentation

### Move in
- M: Login and explore manager features
    - Use Amazon Cognito
    - Use AWS Amplify Auth for sign in on client side

- M: Add 3 units with different floorplan and announcement
    - Add to Aparts DB
    - Use AWS Amplify API to call lambda functions and fetch data
    - api : createApart

- M: Add 2 new residents on 0101 (Lease 6 months)
- M: Add 1 new resident on 0201 with pet (lease 12 months)
    - Signup on cognito > Add to Residents DB > Add to Aparts DB, 0101 document
    - Denormalization : save resident on both resident DB and apart DB to access server only once to get both apart and resident info
    - api : createResident

- R: Check email > Verify email and change password
    - Include link to verify email and redirect user to password change page
    - api : customMessage

- R: Explore resident feature

- M: Explore resident info on 0101


### Maintanance
- R: Create 2 request (1 high, 1 normal)
    - Add to Maintanances DB
    - Use requestedAt property as sort key to always sort by requested time
    - api : createRequest

- M: Check reqeusts > Process > Take notes > Complete
    - Sort by time and priority (The oldest and high priority request show on the top)
    - api : listRequests, updateRequestNote, updateStatus


### Announcement
- M: Make announcement for all / units / pet owners
    - Query aparts by apartId / building num / property like isPet and loop aparts list, update announcement on each apart
    - api : updateAnnouncement

- R: Check and dismiss announcement
    - Update isAnnouncementConfirmed to true
    - api : confirmAnnouncement

- M: Make another announcement
    - Update announcment and isAnnouncementConfirmed to false

- R: Check again for new one


### Payment
- S(A): API gateway > Run chargeMonthly
    - This is triggered automatically by system schedule on the 1st day, every month (Setup on AWS CloudWatch)
    - Trigger manually for demo
    - api : chargeMonthly

- R: Login 0101 > Show payment

- R: Add/Delete payment methods
    - Payment info is added to Residents DB because it belongs to each resident
    - updateBankAccount, updateCard

- R: Add/Delete Autopay
    - Autopay is triggered automatically by system schedule on every month
    - Autopay info is added to Aparts DB so that autopay system doesn't need to check every Residents DB on that unit
    - api : updateAutopay

- R: Pay now
    - When charge or make a payment, get the latest balance from Payments DB which is sorted by time > Add it to current charge or payment
    - This makes new record, not deleting previous charges so it keeps all the records
    - api : createPayment

- M: Check payment is made correctly
    - api : listPayments

- S: Alert payment due date
    - Update announcement to pay on every 5th day for any units that balance is not 0
    - api : alertLatePayment


### Move out
- M: Early Move out button > Change date to next month > Confirm move out
    - Update moveOutDate from Aparts DB
    - Update moveOutConfirmed to true so it cannot change any more
    - api : updateMoveOutDate

- S: Check each unit's moveOutDate everyday and see if any unit reached 60 days before moveOutDate > Postpone moveOutDate to 60 days from today
    - Skip if no moveOutDate (vacant) or moveOutDateConfirmed
    - Alert each residents in the unit that you reached 60 days
    - api : updateMoveOut

- M: 0101 > Delete one of residents > Balance not 0 warning

- R: 0101 > Pay Now
    - Get the latest balance and add transaction to pay off the balance
    - api : createPayment

- M: 0101 > Delete residents
    - To apply "isLoading" on the specific button, made "isDeleting" array and indexToDelete variable
    - Delete resident from Residents DB and from the unit's residents list of Aparts DB
    - api : deleteResident, removeResident (from apart)

- A: Change 0201's leaseEndDate to 60 days from today (simulate that he didn't confirm move out and reached 60 days)
    - Because "Renew" button only show when leaseEndDate is less than 60 days from today

- M: 0201 > Renew 12 months
    - api : renew


### Other Technical Stuff
- Pass props from App to a component rendered by React Router
  (Fetch all data for that user on App when login and pass all props down to each component when rendered)

### Q&A
- Q: What was the most difficult part?
    - A: Data modeling, it was hard to come up with the structure at first and I needed to modify alot during the development. and later, I event felt like NoSQL was not the right choice for this project since I needed to query/get/filter with non-key properties a lot of times
    - A: For React, deciding where to write logic, which components should be class/functional, making a component reusable
- Q: 
