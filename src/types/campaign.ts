export interface CampaignData {
  // Step 1: Location & Category
  country: string;
  state: string;
  school: string;
  category: string;

  // Step 2: Goal
  currency: "NGN" | "USDT";
  amount: number;
  autoAdjustGoal: boolean;

  // Step 3: Story
  coverPhoto?: File | string;
  title: string;
  story: string;

  // Step 4: Additional Details
  targetDate?: string;
  tags?: string[];
}

export interface CampaignStep {
  id: number;
  title: string;
  description: string;
  component: React.ComponentType<unknown>;
}

export const CAMPAIGN_CATEGORIES = [
  "Healthcare",
  "Animals",
  "Education",
  "Environment",
  "Community",
  "Research",
  "Disaster Relief",
  "Social Welfare",
  "Others",
] as const;

export const SUPPORTED_COUNTRIES = [
  { code: "NG", name: "Nigeria" },
  { code: "US", name: "United States" },
  { code: "GB", name: "United Kingdom" },
  { code: "CA", name: "Canada" },
  { code: "AU", name: "Australia" },
] as const;

export const NIGERIAN_STATES = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
  "FCT",
] as const;

export const NIGERIAN_SCHOOLS = [
  "University of Lagos",
  "University of Ibadan",
  "Ahmadu Bello University",
  "University of Nigeria, Nsukka",
  "Obafemi Awolowo University",
  "University of Benin",
  "University of Ilorin",
  "Federal University of Technology, Akure",
  "University of Port Harcourt",
  "Covenant University",
  "Babcock University",
  "Afe Babalola University",
  "American University of Nigeria",
  "Bells University of Technology",
  "Benson Idahosa University",
  "Bowen University",
  "Caleb University",
  "Caritas University",
  "Chrisland University",
  "Crawford University",
  "Crown University",
  "Edwin Clark University",
  "Elizade University",
  "Evangel University",
  "Fountain University",
  "Godfrey Okoye University",
  "Gregory University",
  "Hallmark University",
  "Hezekiah University",
  "Igbinedion University",
  "Joseph Ayo Babalola University",
  "Kings University",
  "Kwararafa University",
  "Landmark University",
  "Lead City University",
  "Madonna University",
  "McPherson University",
  "Mountain Top University",
  "Nile University of Nigeria",
  "Novena University",
  "Oduduwa University",
  "Pan-Atlantic University",
  "Paul University",
  "Redeemer's University",
  "Rhema University",
  "Ritman University",
  "Salem University",
  "Samuel Adegboyega University",
  "Skyline University Nigeria",
  "Southwestern University",
  "Summit University",
  "Tansian University",
  "Trinity University",
  "University of Mkar",
  "Veritas University",
  "Wellspring University",
  "Wesley University of Science and Technology",
  "Western Delta University",
  "Other",
] as const;
