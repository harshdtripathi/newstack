const Subsection=require("../models/SubSection");
const Section=require("../models/Section");

const { imageuploadetocloudinary } = require("../utils/imageuploader"); 

exports.createSubSection=async (req,res)=>{
     try{
        const {title,timeDuration,description,sectionId}=req.body;
        // extract video file

        const video=req.files.videofile;

        if(!title|| !time || !timeDuration || !description || !sectionId|| !video)
        {
            return res.status(400).json({
                success:false,
                message: "properties are missing"
            });
        }

            // upload video to cloudinary
                 const uploaddetails=await imageuploadetocloudinary( video,process.env.FOLDER_NAME);

            // create subsection
            const SubsectionDetails=await Subsection.create({title:title,description:description,
                timeDuration:timeDuration, videoUrl:uploaddetails
            });

            // update section with this subsection objectId

            const updatedSection =await  Section.findByIdAndUpdate({_id:sectionId},{$push:{
                subSection:SubsectionDetails._id
            }},{new:true}).populate("subSection");

            res.status(200).json({
                success:true,
                message:"section created successfully",
                updatedSection,

            });
        

     }
     catch(e){
        return res.status(400).json({
                 success:false,
                 message:"error occured"
        })

     }
}
exports.updateSubSection=async ( req,res)=>{
    try{ // considering video update is not required
        const {title,timeDuration,description,sectionId}=req.body;
         
        if(!title|| !timeDuration || !description || !sectionId|| !video)
            {
                return res.status(500).json({
                    success:false,
                    message: "properties are missing"
                });
            }
             const updatedSubsection= await Subsection.findByIdAndUpdate(sectionId,{title:title,description:description, timeDuration:timeDuration},{new:true})
            return res.status(200).json({
                success:true,
                message:"subection updated successfully",
                updatedSubsection 

             })

    }
    catch(e){

        return res.status(500).json({
            success:false,
            message:"error occured"
   });

    }
}

exports.deleteSubSection = async (req, res) => {
    try {
        const { SubsectionId } = req.params;

        // Check if SubsectionId is provided
        if (!SubsectionId) {
            return res.status(400).json({
                success: false,
                message: "Subsection ID is required",
            });
        }

        // Find the subsection
        const subsection = await Subsection.findById(SubsectionId);
        if (!subsection) {
            return res.status(404).json({
                success: false,
                message: "Subsection not found",
            });
        }

        // Remove the subsection from the Section model
        await Section.findByIdAndUpdate(subsection.section, {
            $pull: { subSection: SubsectionId },
        });

        // Delete the subsection
        await Subsection.findByIdAndDelete(SubsectionId);

        res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
        });
    } catch (e) {
        return res.status(500).json({
            success: false,
            message: "Error occurred while deleting subsection",
        });
    }
};