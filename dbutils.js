var mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/my_database';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var employeeSchema = new mongoose.Schema({
	name : {type :String},
	email : {type :String},
	comp_id : {type:String},
	addr :{type:String},
	pin : {type:String},
	balance :{type:Number,default:0},
});


var companySchema = new mongoose.Schema({
	_id : {type :String},
	name : {type:String},
});

var vendorSchema = new mongoose.Schema({
	name : {type:String},
	balance : {type:Number},
});

var transactionSchema = new mongoose.Schema({
	emp_id : {type:String},
	emp_name : {type:String},
	comp_id : {type:Number ,default: null},
	vendor_id : {type :String , default:null},
	vendor_name : {type :String , default:null},
	debit_amt : {type:Number, default : 0},
	credit_amt : {type:Number, default : 0},
	remarks : {type:String},
	doneAt : {type :Date,default:Date.now},
});



	var employee = mongoose.model('employee',employeeSchema);
	var company = mongoose.model('company',companySchema);
	var vendor = mongoose.model('vendor',vendorSchema);
	var transaction = mongoose.model('transaction',transactionSchema);
	module.exports ={
		registerEmployee : function(req,callback){
			var data = new employee(req);
			data.save(function(err,res){
				if(err)
				{
					callback(err,null);
				}
				else
				{
					callback(0,res);
				}
			})
		},
		showEmployee:function(callback){
			employee.find({},function (err,res) {
				if(err)
					callback(err,null);
				else
					callback(0,res);
			})
		},
		addCompany:function (details,callback) {
			var data = new company(details);
			data.save(function (err,result) {
				if(err)
					callback(err,null);
				else
					callback(0,result);
			});
		},
		showCompany:function(callback){
			company.find({},function (err,res) {
				if(err)
					callback(err,null);
				else
					callback(0,res);
			})
		},
		addVendor:function (details,callback) {
			var data = new vendor(details);
			data.save(function (err,result) {
				if(err)
					callback(err,null);
				else
					callback(0,result);
			});
		},
		showVendor:function(callback){
			vendor.find({},function (err,res) {
				if(err)
					callback(err,null);
				else
					callback(0,res);
			})
		},
		newTransaction:function (details,callback) {
			var data = new transaction(details);
			data.save(function (err,result) {
				if(err)
					callback(err,null);
				else
					callback(0,result);
			});
		},
		showTransaction:function(query,callback){
			transaction.find({emp_id:query.id},function (err,res) {
				if(err)
					callback(err,null);
				else
					callback(0,res);
			});
		},
		checkLogin:function(details,callback)
		{
			employee.findOne({name : details.name , pin : details.pin},function(err,res){
				if(err)
					callback(err,null);
				else
					callback(0,res);
			});
		},
		updateBalance:function (data,callback) {
			employee.update({_id:data.id},{$set : {balance:data.debit_amt}},function (err,res) {
				if(err)
					callback(err,null);
				else
					callback(0,res);
			});
		}
	}