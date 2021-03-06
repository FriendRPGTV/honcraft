if (typeof honcraft === 'undefined') honcraft = {};
$.extend(honcraft, (function () {
    var hc = {};	   
    hc.math = {
		getAllCombinations: function (n, k, callback) {
			var iterate = function (remaining, args) {
				var len = args.length;
				for (var i = args[len - 1]; i < n; i++) {
					args.splice(len);
					args[len - 1] = i;
					if (remaining > 0) {
						args[len] = i;
						iterate(remaining - 1, args);
					}
					else {
						callback.call(null, args);
					}
				}
			}
            if (k == 0) 
            {                
                callback.call(null, []);
            }
            else
            {
                iterate(k - 1, [0]);
            }
		},
        iterateArrayOfArrays: function(arrayOfArrays, callback)
        {   
			var iterate = function (position, args) {                
                for (var i = 0; i < arrayOfArrays[position].length; i++)
                {
                    args[position] = arrayOfArrays[position][i];                    
                    if (position == arrayOfArrays.length - 1)
                    {
                        callback.call(null, args);
                    }
                    else
                    {
                        iterate(position + 1, args);
                    }
                    
                }                	
			}
            if (arrayOfArrays.length == 0)
            {
                callback.call(null, []);
            }
            else
            {
                iterate(0, []);
            }
        },
		getCritMultiplier: function(critMultipliers) {            
			critMultipliers.sort(function(a, b) {return b.criticalMultiplier - a.criticalMultiplier});
			var dpsMultiplier = 1;                   
			var totalCriticalChance = 0;             
			$.each(critMultipliers, function (i, critMultiplier) {                
				var diminishedChance = (1 - totalCriticalChance) * critMultiplier.criticalChance;
				dpsMultiplier = dpsMultiplier + (diminishedChance * (critMultiplier.criticalMultiplier - 1));
				totalCriticalChance += diminishedChance; 
			});
						
			return {dpsMultiplier: dpsMultiplier, totalCriticalChance: totalCriticalChance};            
		},
		getAttacksPerSecond: function (BAT, IAS) {
			// BAT in seconds.
			if (BAT <= 0) return 0;
			var aps = Math.floor(20 * (1 + (.01 * IAS)) / BAT) / 20;
			if (aps > 20) return 20;
			if (aps < 0) return 0;
			return aps;
		},
		getArmorMultiplier: function (armor) {
			var multiplier = 1;
			if (armor > 0) {
				multiplier = 1 - ((.06 * armor) / (1 + (.06 * armor)));
			}
			if (armor < 0) {
				multiplier = Math.min(2, Math.pow(.94, armor));
			}
			return multiplier;
		},
	};  
    return hc;
})());



