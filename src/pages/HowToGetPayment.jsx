import project from "@/libs/project";
import HelpersAddButton from "@/pages/helpers/AddButton";
import ShortLinks       from "@/pages/helpers/ShortLinks";

export default ()=>{

  let pr =  project(s=>({ user:s.user}));

  return <div className="HowToGetPayment">
    <h2>Site Integrations</h2>
    <article>
      <h3>Buy now Button</h3>
      <h4>Easiest way to get payment.</h4>
      <div class='imageCrop'><img src='/i/exampleStore.jpg' /></div>
      <p>Put link to your site. When customer clicks, redirects to our service. When payment is made, we transfer to you and we ping ( post details ) to your site and email you details.
      <ul>
        <li>You can edit link here or by your server side programming.</li>
        <li>We cant track Partial/multiple payments (installments), but you can</li>
      </ul>
      </p>
      {(pr.user.role != 'guest')&& <HelpersAddButton /> }
    </article>
    <h3></h3>
    <h2>Whatsapp/Instagram Links</h2>
    <article>
      <h3>Sharing payment link</h3>
      <h4>Send the short link to get paid</h4>
      <div class='imageCrop'></div>
      <p><img src='/i/whatsappmessage.jpg' className="oneInterestingWhatsAppChatImage" />Send this link to your user, when user pays, you get alert. 
      <ul>
        <li>Details (price, product name etc. ) are recorded on our db.</li>
        <li>Does track partial/multiple payments (installments).</li>
        <li>User/Product tracking can be made by appending </li>
        </ul>
      </p>
      {(pr.user.role != 'guest')&& <ShortLinks /> }
    </article>
  </div>

}