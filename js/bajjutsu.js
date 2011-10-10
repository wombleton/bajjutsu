(function() {
  Ext.ns('Bajjutsu');
  Bajjutsu.Technique = Ext.extend(Ext.Carousel, {
    constructor: function(cfg) {
      if (cfg == null) {
        cfg = {};
      }
      cfg = Ext.applyIf(cfg, {
        cls: 'technique',
        flex: 1,
        items: [
          {
            html: "<h1>Healing Wind Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.svg\"/>Heals Allies</p>"
          }, {
            html: "<h1>Stubborn Tortoise Technique</h1>\n<p class=\"armsup armsdown\"><img src=\"images/attack.svg\"/><img src=\"images/block.svg\"/>Charge Shields</p>"
          }, {
            html: "<h1>Fire Form Technique</h1>\n<p class=\"armscrossed\"><img src=\"images/block.svg\"/>Damages Attackers</p>"
          }, {
            html: "<h1>Void Spirit Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.svg\"/>Drains Charge</p>"
          }, {
            html: "<h1>Winding Viper Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.svg\"/>Hurt Blockers</p>"
          }
        ]
      });
      return Bajjutsu.Technique.superclass.constructor.call(this, cfg);
    }
  });
  Ext.ns('Bajjutsu');
  Bajjutsu.Charge = Ext.extend(Ext.Carousel, {
    constructor: function(cfg) {
      if (cfg == null) {
        cfg = {};
      }
      cfg = Ext.applyIf(cfg, {
        activeItem: 3,
        cls: 'charge',
        direction: 'vertical',
        items: [
          {
            cls: 'charge_3'
          }, {
            cls: 'charge_2'
          }, {
            cls: 'charge_1'
          }, {
            cls: 'charge_0'
          }
        ],
        flex: 1,
        indicator: false
      });
      return Bajjutsu.Charge.superclass.constructor.call(this, cfg);
    },
    setCharge: function(charge) {
      if (!this.flag) {
        this.flag = true;
        if (charge < 0) {
          charge = 0;
        }
        if (charge > 3) {
          charge = 3;
        }
        this.charge = charge;
        return this.setActiveItem(3 - charge);
      }
    },
    resetCharge: function() {
      return this.setCharge(0);
    }
  });
  Ext.ns('Bajjutsu');
  Bajjutsu.Health = Ext.extend(Ext.Carousel, {
    constructor: function(cfg) {
      if (cfg == null) {
        cfg = {};
      }
      cfg = Ext.applyIf(cfg, {
        activeItem: 0,
        cls: 'health',
        direction: 'vertical',
        flex: 1,
        items: [
          {
            cls: 'health_6'
          }, {
            cls: 'health_5'
          }, {
            cls: 'health_4'
          }, {
            cls: 'health_3'
          }, {
            cls: 'health_2'
          }, {
            cls: 'health_1'
          }
        ],
        indicator: false
      });
      return Bajjutsu.Health.superclass.constructor.call(this, cfg);
    },
    setHealth: function(n, setFlag) {
      if (n == null) {
        n = this.health - 1;
      }
      if (setFlag == null) {
        setFlag = true;
      }
      if (!this.flag) {
        if (setFlag) {
          this.flag = true;
        }
        if (n < 0) {
          n = 0;
        }
        if (n > 6) {
          n = 6;
        }
        this.health = n;
        return this.update("<div class=\"badge\">" + n + "</div>");
      }
    },
    resetHealth: function(setFlag) {
      if (setFlag == null) {
        setFlag = true;
      }
      return this.setHealth(6, setFlag);
    }
  });
  Ext.ns('Bajjutsu');
  Bajjutsu.Screen = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
      var charge, health;
      if (cfg == null) {
        cfg = {};
      }
      charge = new Bajjutsu.Charge();
      health = new Bajjutsu.Health();
      cfg = Ext.applyIf(cfg, {
        dockedItems: [
          new Ext.Toolbar({
            dock: 'top',
            items: [
              {
                xtype: 'spacer'
              }, {
                handler: function() {
                  charge.resetCharge(false);
                  return health.resetHealth(false);
                },
                text: 'Meditate',
                xtype: 'button'
              }
            ],
            title: 'Bajjutsu Master'
          })
        ],
        items: [
          {
            flex: 1,
            items: [charge, health],
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
    }
  });
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
