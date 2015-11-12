module.exports=function(){
	var ratePoint=0;
	return{
		rate:function(points){
			ratePoint=points;
		},
		getPoints:function(){
			return ratePoint;
		}
	}
}