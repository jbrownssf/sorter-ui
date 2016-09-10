angular.module('starter.services')
.service('MatchingServ', ['$http', '$window',
        function($http, $window) {
    
    var MatchingServ = this,
    loadedCards = $window.localStorage.loadedCards ? JSON.parse($window.localStorage.loadedCards) : {};
    if(!loadedCards['BNG']) $http({
        url: 'https://api.magicthegathering.io/v1/cards?set=BNG&pageSize=1000',
        method: 'GET'
    }).then(function(res) {
        loadedCards['BNG'] = {};
        var tempRef = loadedCards['BNG'],
        tempRes = res.data.cards,
        lowerCaseName,
        characterCount;
        for(var i in tempRes) {
            characterCount = {};
            tempRef[tempRes[i].name] = {
                multiverseid: tempRes[i].multiverseid,
                imageUrl: tempRes[i].imageUrl
                //characterCount
                //priority
                //nameString
            };
            lowerCaseName = tempRes[i].name.toLocaleLowerCase();
            for(var j in lowerCaseName) {
                characterCount[lowerCaseName[j]] ? characterCount[lowerCaseName[j]]++ : characterCount[lowerCaseName[j]] = 1;
            }
            tempRef[tempRes[i].name].characterCount = characterCount;
        }
        // var count = 0;
        // for(var j in tempRef) {
        //     count++;
        // }
        // console.log(count);
        $window.localStorage.loadedCards = JSON.stringify(loadedCards);
        console.log(loadedCards);
    });
    
    function migrating(ocrString, cb) {
        var tempObj = JSON.parse(JSON.stringify(loadedCards['BNG'])),
        //all limbo*** reference the matching algorithms for ocrString
        limboObj = {}, limboArr = ocrString.toLowerCase().split(" "),
        //all temp*** reference matching algorithms based on current index of the for loop through loaded cards
        tempCC, tempArr, tempPrior;
        
        //checks if the string matches existing string
        if(tempObj[ocrString]) return cb(0, (tempObj[ocrString].nameString = ocrString, JSON.parse(JSON.stringify(tempObj[ocrString])))); //call cb
        ocrString = ocrString.toLowerCase();
        for(var i in tempObj) {
            if(i.toLowerCase() == ocrString) return cb(0, (tempObj[i].nameString = i, JSON.parse(JSON.stringify(tempObj[i])))); //call cb
        }
        
        //preps for matching algorithm
        for(var a in ocrString) {
            limboObj[a] = limboObj[a] ? limboObj[a]++ : 1;
        }
        
        //loops through 'loadedCards' as 'tempObj'
        for(var m in tempObj) {
                tempPrior = 0;
                //increment priority if the string length matches the string in question
                if(m.length == ocrString.length){
                    tempPrior += 2;
                } else if(m.length +1 >= ocrString.length && m.length -1 <= ocrString.length) {
                    tempPrior++;
                }
            // if(m.length +1 < ocrString.length || m.length -1 > ocrString.length) {
            //     delete tempObj[m];
            // } else {
                tempCC = tempObj[m].characterCount;
                
                //Increases priority level for every matching amount of same characters
                for(var l in limboObj) {
                    if(limboObj[l] <= tempCC[l]) tempPrior++;
                }
                
                //checks if each index received matches a character in the item in question
                // ** not as effective as I would like, the next filter is more efficient
                // for(var b in ocrString) {
                //     if(ocrString[b] == m.toLowerCase()[b]) tempObj[m].priority ? tempObj[m].priority++ : tempObj[m].priority = 1;
                // }
                
                //break up the string by spaces and check if each index of the arary matches anything in question
                tempArr = m.toLowerCase().split(" ");
                for(var d in limboArr) {
                    if(limboArr[d] == tempArr[d]) tempPrior++;
                    for(var c in limboArr[d]) {
                        if(tempArr[d] && tempArr[d][c] && limboArr[d][c] == tempArr[d][c]) tempPrior++;
                    }
                }
                
                // console.log(tempObj[m]);
                //I could check if each item in the above arrays length match eachother and increment priority based on that
                
                (!tempPrior || tempPrior < 3) ? delete tempObj[m] : tempObj[m].priority = tempPrior;
                //TODO: reduce results to no more than 5
                tempObj[m] && console.log(tempPrior);
            // }
        }
        cb(JSON.parse(JSON.stringify(tempObj)));
        // alert('It took ' + (new Date() - start) + 'ms');
    }
    MatchingServ.checkCard = function(ocrString, cb) {
        migrating(ocrString, cb);
        /*
        var tempObj = {},
        limboObj = {},
        limboString = ocrString.toLowerCase(),
        tempLoadedCards = JSON.parse(JSON.stringify(loadedCards));
        if(loadedCards['BNG'][ocrString]) {
            tempObj = JSON.parse(JSON.stringify(loadedCards['BNG'][ocrString]));
            tempObj.nameString = ocrString;
            return cb(0, tempObj);
        }

        for(var j in loadedCards['BNG']) {
            if(j.toLowerCase() == limboString) {
                tempObj = JSON.parse(JSON.stringify(loadedCards['BNG'][j]));
                tempObj.nameString = j;
                return cb(0, tempObj);
            }
            if(j.length >= limboString.length - 1 || j.length <= limboString.length + 1) tempObj[j] = tempLoadedCards['BNG'][j];
        }
        
        for(var k in tempObj) {
            if(tempObj[k].characterCount[' '] !== limboObj[' ']) delete tempObj[k];
        }
        
        for(var l in limboObj) {
            for(var m in tempObj) {
                if(limboObj[l] == tempObj[m].characterCount[l]) tempObj[m].priority ? tempObj[m].priority++ : tempObj[m].priority = 1;
            }
        }
        // for(var o in ocrString) {
        //     for(var n in tempObj) {
        //         if(ocrString[o] == n[o]) tempObj[n].priority ? tempObj[m].priority++ : tempObj[m].priority = 1;
        //     }
        // }
        var count = 0;
        for(var j in tempObj) {
            count++;
            if(count > 1) break;
        }
        if(count == 1) { 
            for(var z in tempObj) {
                tempObj[z].nameString = z;
                cb(0, tempObj[z]);
            }
            cb(0, JSON.parse(JSON.stringify(tempObj)))
        } else {
            cb(JSON.parse(JSON.stringify(tempObj)));
        }
        */
    };
    
    MatchingServ.setCard = function(typedName) {
        //search the current set for the specific card name
    };
    
}]);