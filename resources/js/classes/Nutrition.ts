import { Plan } from "@/types/weekly-nutrition";

export class Nutrition {
    plan: Plan;

    constructor(plan: Plan) {
        this.plan = plan;
    }

    getPlanName() {
        if (this.plan?.nutrition_plan == null) {
            return 'No plan generated';
        }

        return this.plan?.nutrition_plan?.split(',')[1]?.split(":")[1]?.replaceAll('"', "");
    }

    getWeekNumber() {
        return this.plan.week_number;
    }

    getPlanId() {
        return this.plan.id;
    }

    getPlanUserId() {
        return this.plan.user_id;
    }
}