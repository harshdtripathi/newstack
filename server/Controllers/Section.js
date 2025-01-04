const section = require("../models/Section");
const course=require("../models/Course");


exports.createSection=async (req,res)=>{
    try{
          // fetch data

          const {sectionName,courseId}=req.body;
          console.log({sectionName},{courseId});

          // validation
          if(!sectionName)
          {
            return res.status(400).json({
                success:false,
                message:"name is required for section"
            });
          }

          // create section 

         const newsection=await section.create({sectionName});
          

          // update course with section object id
          const sectionDetails=await course.findByIdAndUpdate(courseId,{
            $push:{
                courseContent:newsection.id
            }
          }, {new:true})
          console.log("flag2");

          // return response

          res.status(200).json({
            success:true,
            message:"section created successfully",

            sectionDetails,
          })






    }
    catch(e){
        return res.status(500).json({
            success:false,
            message: "unable to create section"
        })



    }
}

exports.updateSection=async (req,res)=>{
    try{
        const {sectionName,sectionId}=req.params;
        // data validation

        if(!sectionName || !sectionId)
        {
            return res.status(404).json({
                success:false,
                message:"Missing properties"
            });
        }

        const updatedDetails= await section.findByIdAndUpdate(sectionId, {sectionName:sectionName},{new:true});
             return res.status(200).json({
                success:true,
                message:"section updated successfully"
             })


    }
    catch(e){
        return res.status(500).json({
            success:false,
            message: "unable to create section"
        });


    }
};

exports.deleteSection=async (req,res)=>{
    try{

        //

        const{sectionId}= req.body;
        // do we need to delete the entry  from course schema

        if( !sectionId)
        {
            return res.status(400).json({
                success:false,
                message:"nothing to delete"
            });
               
              
            
        }
        await course.findByIdAndDelete(sectionId);

        res.status(400).json({
            success:true,
            message:"section deleted successfully",

        })

    }
    catch{
        return res.status(400).json({
            success:false,
            message:"error occured"
        });

    }
}
