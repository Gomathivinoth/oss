const Hospital = require('../models/hospital'); // Import Hospital Model Schema
const User = require('../models/user');
const config = require('../config/database'); // Import database configuration
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

module.exports = (router) => { 

    router.post('/login',(req,res) => {
        if(!req.body.username){
            res.json({ success:false , message:'No username provided'});
        } else {
            if(!req.body.password){
                res.json({ success:false , message:'No password provided'});
            } else {
                User.findOne({username:req.body.username} , (err,user) =>{
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                        if(!user){
                            res.json({ success:false , message:'Invalid Username'});
                        } else {
                            User.findOne({ password:req.body.password} , (err,user) => {
                                if(err) {
                                    res.json({ success:false , message:err});
                                } else {
                                    if(!user){
                                        res.json({ success:false , message:'Invalid Password'});
                                    } else {
                                        const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client
                                        res.json({ success:true , message:user , token:token , user: { username:user.username }});
                                    }
                                }
                            });
                        }
                    }
                });
            }
        }
    });

    /* ================================================
  MIDDLEWARE - Used to grab user's token from headers
  ================================================ */
  router.use((req, res, next) => {
    const token = req.headers['authorization']; // Create token found in headers
    // Check if token was found in headers
    if (!token) {
      res.json({ success: false, message: 'No token provided' }); // Return error
    } else {
      // Verify the token is valid
      jwt.verify(token, config.secret, (err, decoded) => {
        // Check if error is expired or invalid
        if (err) {
          res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
        } else {
          req.decoded = decoded; // Create global variable to use in any request beyond
          next(); // Exit middleware
        }
      });
    }
  });

  /**Add new Hospital**/
  router.post('/addHospital',(req,res) => {
     if(!req.body.hospitalName){
        res.json({ success:false , message:'No hospital Name Provided'});
     } else {
         if(!req.body.hospitalEmail){
            res.json({ success:false , message:'No E-mail Id Provided'});
         } else {
             const hospital = new Hospital({
                 hospitalName:req.body.hospitalName,
                 hospitalEmail:req.body.hospitalEmail
             });

             hospital.save((err) => {
                if(err){
                    res.json({ success:false , message:err});
                } else {
                    res.json({ success:true , message:'Hospital saved!'});
                }
             });
         }
     }
  });

//Get all hospitals

router.get('/getHospitals',(req,res) => {
    Hospital.find({ } ,(err,data)=>{
        if(err) {
            res.json({ success:false , message:err});
        } else {
            res.json({ success:true , message:data});
        }
    });
});

//Get single Hospital
 router.get('/getSingleHospital/:id',(req,res) => {
        if(!req.params.id){
            res.json({ success:false , message:'No hospital id was provided!!'});
        } else {
            Hospital.findOne({ _id: req.params.id } , (err,hospital) => {
                if(err){
                    res.json({ success:false , message:'Not a valid hospital id!!'});
                } else {
                    if(!hospital){
                        res.json({ success:false , message: 'No hospital found'});
                    } else {
                        res.json({ success:true , message:hospital});
                    }
                }
            });
        }
    });

//Update hospital
router.put('/updateHospital',(req,res) => {
    //console.log(req.body);
    if(!req.body.newHospitalId){
        res.json({ success:false , message:'No Id was provided!'});
    } else {
        req.body.newHospitalId = mongoose.Types.ObjectId(req.body.newHospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id:req.body.newHospitalId} , (err,hospital) =>{
            if(err){
                res.json({ success:false , message:'Not a valid hospital Id'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'Hospital Id was not found'});
                } else {
                    hospital.hospitalName = req.body.newHospitalName;
                    hospital.hospitalEmail = req.body.newHospitalEmail;
                    hospital.save((err) => {
                        if(err){
                            res.json({ success:false , message:err});
                        } else {
                            res.json({ success:true , message: 'Hospital Updated!'});
                        }
                    });
                }
            }
        });
    }
});

//Delete Hospital
router.delete('/deleteHospital/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No Id was provided!'});
    } else {
        Hospital.findOne({ _id:req.params.id} , (err,hospital) => {
            if(err){
                res.json({ success:false , message:err});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital was found!'})
                } else {
                    hospital.remove((err) => {
                        if(err){
                            res.json({ success:false , message:err});
                        } else {
                            res.json({ success:true , message:'Hospital deleted'});
                        }
                    });
                }
            }
        });
    }
});

//Add Branch from select hospital
router.post('/addBranch',(req,res) => {
    if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id : req.body.hospitalId },(err,hospital) => {
            if(err){
                res.json({ success:false , message:'Something happened!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital matches the id'})
                } else {
                    //Add Branch
                    hospital.branchDetails.push({
                        branchName:req.body.branchName,
                        branchEmail:req.body.branchEmail
                    });
                    //Increase branch count 
                    hospital.noOfBranches++;
                    hospital.hasBranch = 'Yes';
                    //Save hospital with Brranch
                    hospital.save((err) => {
                        if(err){
                            res.json({ success:false , message:'Something went wrong!'});
                        } else {
                            res.json({ success:true , message:'Branch Added'});
                        }
                    });
                }
            }
        });
    }
});

//Get Branches
router.get('/getBranches/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        Hospital.findOne({_id : req.params.id} , (err,hospital) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital found'});
                } else {
                    res.json({ success:true , message:hospital.branchDetails});
                }
            }
        });
    }
});

//Add Hospital Admin from select hospital
router.post('/addHospitalAdmin',(req,res) => {
 if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id : req.body.hospitalId },(err,hospital) => {
           if(err){
                res.json({ success:false , message:'Something happened!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital matches the id'})
                } else {
                    const user = new User({
                      hospitalId:req.body.hospitalId,
                      name:req.body.name,
                      username:req.body.username,
                      password:req.body.password,
                      userType:'hospital_admin'
                  });

                 user.save((err) => {
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                        res.json({ success:true , message:'Hospital Admin saved!'});
                    }
                 });
                }
            } 
        });
    }
});

//Get Hospital Admin
router.get('/viewHospitalAdmin/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        User.find({hospitalId : req.params.id} , (err,hospitalAdmin) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!hospitalAdmin){
                    res.json({ success:false , message:'No hospital Admin found'});
                } else {
                    res.json({ success:true , message:hospitalAdmin});
                }
            }
        });
    }
});

//Add Hospital Admin from select hospital
router.post('/addBranchAdmin',(req,res) => {
 if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id : req.body.hospitalId },(err,hospital) => {
           if(err){
                res.json({ success:false , message:'Something happened!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital matches the id'})
                } else {
                    const user = new User({
                      hospitalId:req.body.hospitalId,
                      branchId:req.body.branchId,
                      name:req.body.name,
                      username:req.body.username,
                      password:req.body.password,
                      userType:'branch_admin'
                  });

                 user.save((err) => {
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                         User.find({ branchId : req.body.branchId },(err,branch) => {
                             if(err){
                                res.json({ success:false , message:'Something happened!'});
                            } else {
                                if(!branch){
                                    res.json({ success:false , message:'No Branch matches the id'})
                                } else {
                                   res.json({ success:true , message:'Branch Admin saved!', data:branch});
                                }
                            }
                         });
                        
                    }
                 });
                }
            } 
        });
    }
});

//Get Hospital Admin
router.get('/viewBranchAdmin/:id',(req,res)=>{
  //  console.log(req.params.id);
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        User.find({branchId : req.params.id} , (err,branchAdmin) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!branchAdmin){
                    res.json({ success:false , message:'No Branch Admin found'});
                } else {
                    res.json({ success:true , message:branchAdmin});
                }
            }
        });
    }
});


//Add Surgeon from select hospital
router.post('/addSurgeon',(req,res) => {
 if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id : req.body.hospitalId },(err,hospital) => {
           if(err){
                res.json({ success:false , message:'Something happened!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital matches the id'})
                } else {
                    const user = new User({
                      hospitalId:req.body.hospitalId,
                      branchId:req.body.branchId,
                      name:req.body.name,
                      username:req.body.username,
                      password:req.body.password,
                      userType:'surgeon'
                  });

                 user.save((err) => {
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                           User.find({ branchId : req.body.branchId },(err,branch) => {
                             if(err){
                                res.json({ success:false , message:'Something happened!'});
                            } else {
                                if(!branch){
                                    res.json({ success:false , message:'No Branch matches the id'})
                                } else {
                                   res.json({ success:true , message:'Branch Admin saved!', data:branch});
                                }
                            }
                         });
                    }
                 });
                }
            } 
        });
    }
});

//Get single Hospital Admin
router.get('/getSingleHospitalAdmin/:id',(req,res)=>{
    //console.log(req.params.id);
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        User.findOne({_id : req.params.id} , (err,branchAdmin) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!branchAdmin){
                    res.json({ success:false , message:'No Branch Admin found'});
                } else {
                    res.json({ success:true , message:branchAdmin});
                }
            }
        });
    }
});

//Get single Hospital Admin
router.get('/getSingleBranchAdmin/:id',(req,res)=>{
    //console.log(req.params.id);
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        User.find({branchId : req.params.id} , (err,branchAdmin) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!branchAdmin){
                    res.json({ success:false , message:'No Branch Admin found'});
                } else {
                    res.json({ success:true , message:branchAdmin});
                }
            }
        });
    }
});

//Update hospital
router.put('/updateHospitalAdmin',(req,res) => {
    //console.log(req.body.edithospitalId);
    if(!req.body.edithospitalId){
        res.json({ success:false , message:'No Id was provided!'});
    } else {
        req.body.edithospitalId = mongoose.Types.ObjectId(req.body.edithospitalId);//Converting string type to ObjectId type
        User.findOne({ _id:req.body.edithospitalId} , (err,user) =>{
            if(err){
                res.json({ success:false , message:'Not a valid hospital Id'});
            } else {
                if(!user){
                    res.json({ success:false , message:'Hospital Id was not found'});
                } else {
                    user.name = req.body.editname;
                    user.username = req.body.editusername;
                    user.password = req.body.editpassword;
                    user.save((err) => {
                        if(err){
                            res.json({ success:false , message:err});
                        } else {
                            
                            res.json({ success:true , message: 'Hospital Updated!'});
                        }
                    });
                }
            }
        });
    }
});


//Delete Hospital Admin
router.delete('/deleteHospitalAdmin/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No Id was provided!'});
    } else {
        User.findOne({ _id:req.params.id} , (err,hospitalAdmin) => {
            if(err){
                res.json({ success:false , message:err});
            } else {
                if(!hospitalAdmin){
                    res.json({ success:false , message:'No hospital was found!'})
                } else {
                    hospitalAdmin.remove((err) => {
                        if(err){
                            res.json({ success:false , message:err});
                        } else {
                             User.find( (err,hospitalAdminList) => {
                                if(err){
                                    res.json({ success:false , message:err});
                                } else {
                                    res.json({ success:false , message:hospitalAdminList});
                                }
                             });
                        }
                    });
                }
            }
        });
    }
});

router.get('/getSurgeon/:id',(req,res)=>{
    if(!req.params.id){
        res.json({ success:false , message:'No id provided'});
    } else {
        req.params.id = mongoose.Types.ObjectId(req.params.id);
        
        User.find({branchId : req.params.id} , (err,hospital) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                User.find({userType : "surgeon"} , (err,hospital1) => {
            if(err){
                res.json({ success:false , message:'Not a valid Id'});
            } else {
                if(!hospital1){
                    res.json({ success:false , message:'No hospital found'});
                } else {
                    res.json({ success:true , message:hospital1});
                }
            }
        });
            }
        });
    }
});

//Add Surgeon from select hospital
router.post('/addSupportStaff',(req,res) => {
 if(!req.body.hospitalId){
        res.json({ success:false , message:'No hospital id provided'});
    } else {
        req.body.hospitalId = mongoose.Types.ObjectId(req.body.hospitalId);//Converting string type to ObjectId type
        Hospital.findOne({ _id : req.body.hospitalId },(err,hospital) => {
           if(err){
                res.json({ success:false , message:'Something happened!'});
            } else {
                if(!hospital){
                    res.json({ success:false , message:'No hospital matches the id'})
                } else {
                    const user = new User({
                      hospitalId:req.body.hospitalId,
                      branchId:req.body.branchId,
                      name:req.body.name,
                      username:req.body.username,
                      password:req.body.password,
                      userType:'support_staff'
                  });

                 user.save((err) => {
                    if(err){
                        res.json({ success:false , message:err});
                    } else {
                           User.find({ branchId : req.body.branchId },(err,branch) => {
                             if(err){
                                res.json({ success:false , message:'Something happened!'});
                            } else {
                                if(!branch){
                                    res.json({ success:false , message:'No Branch matches the id'})
                                } else {
                                   res.json({ success:true , message:'Branch Admin saved!', data:branch});
                                }
                            }
                         });
                    }
                 });
                }
            } 
        });
    }
});


  return router;
}