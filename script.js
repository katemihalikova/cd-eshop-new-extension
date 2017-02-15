(() => {
  "use strict";

  let Params, ParamsModal;
  window.SearchForm = {
    get Params() {
      return Params;
    },
    set Params(obj) {
      Params = function(params, defaultParams, connFilter, selectedTab, searchForm) {
        let originalApplyBindings = ko.applyBindings;
        ko.applyBindings = () => {};
        obj.apply(this, arguments);
        ko.applyBindings = originalApplyBindings;
        this.paramsModal = new ParamsModal(this, connFilter, searchForm);
        ko.applyBindings(this.paramsModal, document.querySelector("#connectionParamsModal"));
      };
      Params.prototype = obj.prototype;
      let originalGetDescription = Params.prototype.getDescription;
      Params.prototype.getDescription = function() {
        try {
          return originalGetDescription.apply(this, arguments);
        } catch (e) {
          return "";
        }
      };
    },
    get ParamsModal() {
      return ParamsModal;
    },
    set ParamsModal(obj) {
      ParamsModal = function() {
        obj.apply(this, arguments);
        this.changeTimeChange = () => () => this.setTabChanges();
      };
      ParamsModal.prototype = obj.prototype;
    },
  };

  window.addEventListener("message", event => {
    if (event.source === window && event.data.type === "min-max") {
      try {
        // document.querySelector("[data-target='#connectionParamsModal']").click();
        let data = ko.dataFor(document.querySelector("#connectionParamsModal"));
        data.minChangeTimeOptions([{name: event.data.min, value: event.data.min}]);
        data.maxChangeTimeOptions([{name: event.data.max, value: event.data.max}]);
        document.querySelector("[title='Hotovo']").click();
      } catch (error) {
        console.log(error);
        alert("Došlo k nějakému problému :(");
      }
    }
  });
})();
