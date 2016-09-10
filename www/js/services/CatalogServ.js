angular.module('starter.services', [])
.service('CatalogServ', ['$window',
        function($window) {
    
    var CatalogServ = this,
    catalog,
    limboCards = [
    ];
    
    CatalogServ.addCard = function(setName, cardId, cardName, cardUrl) {
        if(!catalog) catalog = $window.localStorage.catalog ? JSON.parse($window.localStorage.catalog) : {};
        if(!catalog[setName]) catalog[setName] = {};
        if(!catalog[setName][cardId]) catalog[setName][cardId] = [, 0, cardUrl];
        catalog[setName][cardId][0] = cardName;
        catalog[setName][cardId][1]++;
        $window.localStorage.catalog = JSON.stringify(catalog);
        return JSON.parse(JSON.stringify(catalog));
    };
    CatalogServ.removeCard = function(setName, cardId) {
        if(!catalog) catalog = $window.localStorage.catalog ? JSON.parse($window.localStorage.catalog) : {};
        if(!catalog[setName]) return;
        if(!catalog[setName][cardId]) return;
        catalog[setName][cardId][1] == 1 ? delete catalog[setName][cardId] : catalog[setName][cardId][1]--;
        var i;
        for(i in catalog[setName]) {}
        if(!i) delete catalog[setName];
        $window.localStorage.catalog = JSON.stringify(catalog);
        return JSON.parse(JSON.stringify(catalog));
    };
    CatalogServ.getCards = function(filter) {
        if(!catalog) catalog = $window.localStorage.catalog ? JSON.parse($window.localStorage.catalog) : {};
        return JSON.parse(JSON.stringify(catalog));
    };
    
    
    
    CatalogServ.addLimboCard = function(limboCard) {
        limboCards.push(limboCard);
        return JSON.parse(JSON.stringify(limboCards));
    };
    CatalogServ.removeLimboCard = function(index) {
        limboCards.splice(index, 1);
        return JSON.parse(JSON.stringify(limboCards));
    };
    CatalogServ.getLimboCards = function(filter) {
        return JSON.parse(JSON.stringify(limboCards));
    };
}]);