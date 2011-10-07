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
            html: "<h1>Healing Wind Technique</h1>\n<p class=\"armsup\"><img src=\"images/attack.png\"/>Heals Allies</p>"
          }, {
            html: "<h1>Stubborn Tortoise Technique</h1>\n<p class=\"armsup armsdown\"><img src=\"images/attack.png\"/><img src=\"images/block.png\"/>Charge Shields</p>"
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
  Bajjutsu.Charge = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
      if (cfg == null) {
        cfg = {};
      }
      cfg = Ext.applyIf(cfg, {
        cls: 'charge',
        flex: 1
      });
      Bajjutsu.Charge.superclass.constructor.call(this, cfg);
      return this.on('render', function() {
        this.resetCharge(false);
        return this.mon(this.el, {
          drag: function(event) {
            var absDeltaX, absDeltaY, deltaY;
            absDeltaX = event.absDeltaX, absDeltaY = event.absDeltaY, deltaY = event.deltaY;
            if (deltaY < -10 && absDeltaY / absDeltaX > 4) {
              return this.setCharge(this.charge + 1);
            } else if (deltaY > 10 && absDeltaY / absDeltaX > 4) {
              return this.setCharge(this.charge - 1);
            }
          },
          scope: this,
          singletap: function() {
            return this.setCharge(this.charge + 1);
          },
          doubletap: function() {
            return this.resetCharge();
          },
          touchend: function() {
            return this.flag = false;
          }
        });
      });
    },
    setCharge: function(charge, setFlag) {
      if (setFlag == null) {
        setFlag = true;
      }
      if (!this.flag) {
        if (setFlag) {
          this.flag = true;
        }
        if (charge < 0) {
          charge = 0;
        }
        if (charge > 3) {
          charge = 3;
        }
        this.charge = charge;
        return this.update("<div class=\"badge\">" + charge + "</div>");
      }
    },
    resetCharge: function(setFlag) {
      if (setFlag == null) {
        setFlag = true;
      }
      return this.setCharge(0, setFlag);
    }
  });
  Ext.ns('Bajjutsu');
  Bajjutsu.Health = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
      if (cfg == null) {
        cfg = {};
      }
      cfg = Ext.applyIf(cfg, {
        cls: 'health',
        flex: 1
      });
      Bajjutsu.Health.superclass.constructor.call(this, cfg);
      return this.on('render', function() {
        this.resetHealth(false);
        return this.mon(this.el, {
          drag: function(event) {
            var absDeltaX, absDeltaY, deltaY;
            absDeltaX = event.absDeltaX, absDeltaY = event.absDeltaY, deltaY = event.deltaY;
            if (deltaY < -10 && absDeltaY / absDeltaX > 4) {
              return this.setHealth(this.health + 1);
            } else if (deltaY > 10 && absDeltaY / absDeltaX > 4) {
              return this.setHealth(this.health - 1);
            }
          },
          scope: this,
          singletap: function(event, target) {
            return this.setHealth();
          },
          touchend: function(event) {
            return this.flag = false;
          }
        });
      }, this);
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
