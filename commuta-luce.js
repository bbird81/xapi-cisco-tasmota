import xapi from 'xapi';

const IP = "x.x.x.x" // ip dell'interruttore Sonoff Tasmota
//se sul tasmota è impostata una password, il formato della url diventa il seguente:
//http://x.x.x.x/cm?user=admin&password=joker&cmnd=Power%20Toggle

const SONOFF_URL_TOGGLE = "http://"+IP+"/cm?cmnd=Power%20TOGGLE";
const SONOFF_URL_ON = "http://"+IP+"/cm?cmnd=Power%20on";
const SONOFF_URL_OFF = "http://"+IP+"/cm?cmnd=Power%20off";

xapi.config.set('HttpClient Mode', 'On'); // abilita l'uso di http client sull'apparato

// Accende la luce alla connesione di una chiamata
xapi.command('HttpFeedback Register', {Expression: '/Event/CallSuccessful', Feedbackslot: '1', ServerUrl: SONOFF_URL_ON})
// Spegne la luce al termine di una chiamata
xapi.command('HttpFeedback Register', {Expression: '/Event/CallSuccessful', Feedbackslot: '2', ServerUrl: SONOFF_URL_OFF})

xapi.event.on('UserInterface Extensions Panel Clicked', (event) => { //panel clicked è per i tasti nella pagina principale
    if(event.PanelId === 'commuta-luce'){
      xapi.command("HttpClient Get", {Url: SONOFF_URL_TOGGLE});
      xapi.command('UserInterface Message Alert Display', {'Title': 'E LUCE FU!', 'Duration': 2});
      }
});