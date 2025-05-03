describe('MenuService', function () {
    var MenuService;
    var $httpBackend;
    var ApiPath = "https://coursera-jhu-default-rtdb.firebaseio.com";
  
    beforeEach(module('common'));
  
    beforeEach(inject(function (_MenuService_, _$httpBackend_) {
      MenuService = _MenuService_;
      $httpBackend = _$httpBackend_;
    }));
  
    afterEach(function () {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    it('should return menu item for valid short name', function () {
      var responseMock = { name: "Orange Chicken", description: "Delicious" };
  
      $httpBackend.expectGET(ApiPath + "/menu_items/L/menu_items/0.json")
                  .respond(responseMock);
  
      var result;
      MenuService.getMenuItem("L1").then(function (response) {
        result = response;
      });
  
      $httpBackend.flush();
      expect(result).toEqual(responseMock);
    });
  
    it('should return null for invalid short name', function () {
      $httpBackend.expectGET(ApiPath + "/menu_items/X/menu_items/999.json")
                  .respond(null);
  
      var result;
      MenuService.getMenuItem("X1000").then(function (response) {
        result = response;
      });
  
      $httpBackend.flush();
      expect(result).toBeNull();
    });
  });
  