'use babel';

import InfluxView from './influx-view';
import { CompositeDisposable } from 'atom';

export default {

  influxView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.influxView = new InfluxView(state.influxViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.influxView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'influx:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.influxView.destroy();
  },

  serialize() {
    return {
      influxViewState: this.influxView.serialize()
    };
  },

  toggle() {
    console.log('Influx was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
