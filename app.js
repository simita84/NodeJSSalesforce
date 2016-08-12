
var async               =  require('async');
var jsforce             =  require('jsforce');
var conn                =  new jsforce.Connection();
var mySDFC_Username     = 'simi@kndy.dev';
var mySDFC_Password     = 'July2016fMfW4iLF2XyakGobvBwNyBsHH';
var accounts            = [];
var reportsRetrieved    = [];
var reportColns         = [];

genericCallback = function(error,result){
    if(error) {console.log('Error--> '+error);}
    else{
        console.log('Result after connecting to SF '+result);
    }   
}
async.waterfall([function(callback) {
    conn.login(mySDFC_Username,mySDFC_Password,genericCallback);
    console.log('Connecting!!!!');
    setTimeout(function(){
         callback(null); 
    },2000);
    
},function(callback) {
    conn.query('select id,name from account',function(error,result){
       if(error){
            console.log('Cannot fetch data'+error);
       }else{
            accounts.push(result.records);
       }
    });
    callback(null);
},function(callback) {
    // get recent reports
    conn.analytics.reports(function(err, reports) {
        if (err) { return console.error(err); }
        //console.log(reports);
        if(reports.length>0){
           for (var i=0; i < 5; i++) {
             reportsRetrieved.push(reports[i].name); 
            }  
            callback(null,reportsRetrieved);    
        }
        
     }); 
},function(reportsRetrieved,callback){
    console.log('Report names');
    console.log(reportsRetrieved);
}
]); 


  


