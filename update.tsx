http://localhost:5005/api/v1/mentee/practice-details



export const getSingleAIInterview = async (req, res) => {
  // const { userId }      = req.user;
  // const { interviewId } = req.params;

  // Validate ObjectId format early — returns a clean 400 instead
  // of a Mongoose CastError 500
  if (!mongoose.Types.ObjectId.isValid(interviewId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid interview ID format",
    });
  }

  try {
    // 1. Try community collection first (most interviews live here)
    let interview = await CommunityAIInterviewModel
      .findById()
      .populate("createdBy", "name surname avatar")
      .lean();

    let source = "community";

    // 2. Not found in community — check private collection
    if (!interview) {
      interview = await PrivateAIInterviewModel
        .findById(interviewId)
        .populate("createdBy", "name surname avatar")
        .lean();
      source = "private";
    }

    // 3. Not found in either collection
    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found. It may have been deleted.",
      });
    }

    // 4. Enforce ownership on private interviews
    if (source === "private") {
      const creatorId =
        interview.createdBy?._id?.toString() ??
        interview.createdBy?.toString() ??
        "";

      if (creatorId !== userId.toString()) {
        return res.status(403).json({
          success: false,
          message: "This interview is private and does not belong to you.",
        });
      }
    }

    return res.status(200).json({
      success: true,
      message: "Interview loaded",
      result: { ...interview, source },  // include source so frontend knows which model it came from
    });

  } catch (error) {
    return serverError(res, error, "getSingleAIInterview");
  }
};
