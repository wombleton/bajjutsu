(function() {

  Ext.ns('Bajjutsu');

  Bajjutsu.Technique = Ext.extend(Ext.Carousel, {
    constructor: function(cfg) {
      if (cfg == null) cfg = {};
      cfg = Ext.applyIf(cfg, {
        cls: 'technique',
        flex: 1,
        items: [
          {
            html: "<h1>Healing Wind Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.png\"/>Heals Allies</p>"
          }, {
            html: "<h1>Stubborn Tortoise Technique</h1>\n<p class=\"armsup armsdown\"><img src=\"images/attack.png\"/><img src=\"images/block.png\"/>Protected By Charge</p>"
          }, {
            html: "<h1>Fire Form Technique</h1>\n<p class=\"armscrossed\"><img src=\"images/block.png\"/>Damages Attackers</p>"
          }, {
            html: "<h1>Void Spirit Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.png\"/>Drains Charge</p>"
          }, {
            html: "<h1>Winding Viper Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.png\"/>Hurt Blockers</p>"
          }
        ]
      });
      return Bajjutsu.Technique.superclass.constructor.call(this, cfg);
    }
  });

  Ext.ns('Bajjutsu');

  Bajjutsu.Charge = Ext.extend(Ext.Carousel, {
    constructor: function(cfg) {
      if (cfg == null) cfg = {};
      cfg = Ext.applyIf(cfg, {
        activeItem: 0,
        charge: 0,
        cls: 'charge-panel',
        direction: 'vertical',
        items: [
          {
            cls: 'charge charge_0'
          }, {
            cls: 'charge charge_1'
          }, {
            cls: 'charge charge_2'
          }, {
            cls: 'charge charge_3'
          }
        ],
        flex: 1,
        indicator: false,
        listeners: {
          cardswitch: function() {
            return this.resetTask.cancel();
          },
          scope: this
        }
      });
      Bajjutsu.Charge.superclass.constructor.call(this, cfg);
      return this.on('render', function() {
        return this.mon(this.el, {
          scope: this,
          singletap: function() {
            return this.setCharge(0);
          },
          touchstart: function(event) {
            if (this.resetTask == null) {
              this.resetTask = new Ext.util.DelayedTask(function() {
                return this.up('screen').reset();
              }, this);
            }
            return this.resetTask.delay(500);
          },
          touchend: function() {
            return this.resetTask.cancel();
          }
        }, this);
      });
    },
    setCharge: function(charge) {
      if (charge < 0) charge = 0;
      if (charge > 3) charge = 3;
      this.charge = charge;
      return this.setActiveItem(charge, {
        direction: 'down',
        type: 'slide'
      });
    },
    resetCharge: function() {
      return this.setCharge(0);
    }
  });

  Ext.ns('Bajjutsu');

  Bajjutsu.Health = Ext.extend(Ext.Carousel, {
    constructor: function(cfg) {
      if (cfg == null) cfg = {};
      cfg = Ext.applyIf(cfg, {
        activeItem: 6,
        cls: 'health-panel',
        direction: 'vertical',
        flex: 1,
        health: 6,
        items: [
          {
            cls: 'health health_0'
          }, {
            cls: 'health health_1'
          }, {
            cls: 'health health_2'
          }, {
            cls: 'health health_3'
          }, {
            cls: 'health health_4'
          }, {
            cls: 'health health_5'
          }, {
            cls: 'health health_6'
          }
        ],
        indicator: false,
        listeners: {
          cardswitch: function() {
            return this.resetTask.cancel();
          },
          scope: this
        }
      });
      Bajjutsu.Health.superclass.constructor.call(this, cfg);
      return this.on('render', function() {
        return this.mon(this.el, {
          scope: this,
          touchstart: function(event) {
            if (this.resetTask == null) {
              this.resetTask = new Ext.util.DelayedTask(function() {
                return this.up('screen').reset();
              }, this);
            }
            return this.resetTask.delay(500);
          },
          touchend: function() {
            return this.resetTask.cancel();
          }
        });
      });
    },
    setHealth: function(health) {
      if (health < 0) health = 0;
      if (health > 6) health = 6;
      return this.setActiveItem(health, {
        direction: 'down',
        type: 'slide'
      });
    },
    resetHealth: function() {
      return this.setHealth(6);
    }
  });

  Ext.ns('Bajjutsu');

  Bajjutsu.Screen = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
      if (cfg == null) cfg = {};
      this.charge = new Bajjutsu.Charge();
      this.health = new Bajjutsu.Health();
      cfg = Ext.applyIf(cfg, {
        dockedItems: [
          new Ext.Toolbar({
            dock: 'top',
            height: 48,
            items: [
              {
                cls: 'logo',
                height: 48,
                xtype: 'spacer'
              }
            ]
          })
        ],
        items: [
          {
            flex: 1,
            items: [this.charge, this.health],
            layout: {
              align: 'stretch',
              type: 'hbox'
            }
          }, new Bajjutsu.Technique()
        ],
        layout: {
          align: 'stretch',
          type: 'vbox'
        }
      });
      return Bajjutsu.Screen.superclass.constructor.call(this, cfg);
    },
    reset: function() {
      this.charge.resetCharge();
      return this.health.resetHealth();
    }
  });

  Ext.reg('screen', Bajjutsu.Screen);

  Ext.setup({
    tabletStartupScreen: 'bajjutsu.svg',
    phoneStartupScreen: 'bajjutsu.svg',
    icon: 'icon.png',
    glossOnIcon: true,
    onReady: function() {
      return new Bajjutsu.Screen({
        fullscreen: true
      });
    }
  });

}).call(this);
