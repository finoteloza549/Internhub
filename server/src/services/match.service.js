import { StudentProfile } from '../models/StudentProfile.js';
import { Job } from '../models/Job.js';

export const matchService = {
  /**
   * Recommend jobs for student using intelligent skill and profile matching
   */
  getRecommendedJobs: async (studentId, limit = 6) => {
    // 1. Fetch Student Profile
    const profile = await StudentProfile.findOne({ userId: studentId });
    const studentSkills = (profile?.skills || []).map((s) => s.toLowerCase().trim());
    const hasEducation = (profile?.education && profile.education.length > 0) || !!profile?.university;
    const hasExperience = profile?.experience && profile.experience.length > 0;

    // 2. Fetch Active Jobs
    const jobs = await Job.find({ status: 'ACTIVE' })
      .populate('companyId', 'name logoUrl location industry')
      .limit(50);

    // 3. Compute Match Score for Each Job
    const scoredJobs = jobs.map((job) => {
      const jobSkills = (job.skills || []).map((s) => s.toLowerCase().trim());
      
      // Calculate matching skills
      const matchingSkills = jobSkills.filter((js) =>
        studentSkills.some((ss) => ss.includes(js) || js.includes(ss))
      );

      let matchScore = 0;

      if (jobSkills.length > 0) {
        const skillOverlapRatio = matchingSkills.length / jobSkills.length;
        matchScore += Math.round(skillOverlapRatio * 70);
      } else {
        matchScore += 40;
      }

      // Bonus for education alignment
      if (hasEducation) {
        matchScore += 15;
      }

      // Bonus for internship/work experience
      if (hasExperience) {
        matchScore += 15;
      }

      // Ensure score stays in a clean realistic range (e.g. 40% - 98%)
      const finalMatchPercentage = Math.min(98, Math.max(30, matchScore));

      return {
        ...job.toObject(),
        matchPercentage: finalMatchPercentage,
        matchingSkills,
      };
    });

    // 4. Sort Descending by Match Percentage
    scoredJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);

    return scoredJobs.slice(0, limit);
  },
};
