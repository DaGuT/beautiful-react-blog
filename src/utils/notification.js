import Noty from 'noty';
import 'noty/lib/noty.css';
import 'noty/lib/themes/nest.css';

export function success(message) {
  (new Noty({text: message, type: 'success', theme:"nest"})).show();
}

export function error(message) {
  (new Noty({text: message, type: 'alert', theme:"nest"})).show();
}