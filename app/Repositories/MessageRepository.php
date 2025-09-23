<?php

namespace App\Repositories;

use App\Models\GpfMessage;
use App\Services\TraineeProgressService;
use Twilio\Rest\Client;

class MessageRepository
{
    protected $message;
    protected $traineeProgessService;

    public function __construct(GpfMessage $message, TraineeProgressService $traineeProgressService)
    {
        $this->message = $message;
        $this->traineeProgressService = $traineeProgressService;
    }

    /**
     * Summary of create
     * @param array $data
     * @return GpfMessage
     */
    public function create(array $data)
    {
        return $this->message->create($data);
    }

    /**
     * Summary of updateConversation
     * Update the messages in db, for conversation logs
     * @param mixed $id
     * @param mixed $newConversation
     * @return bool
     */
    public function update($id, $newConversation)
    {
        return $this->message->where('user_id', $id)
            ->update([
                'conversations' => $newConversation,
            ]);
    }

    /**
     * Summary of getBotMessage  Returns random message update to start a conversation to the trainee
     * @param mixed $user
     * @param mixed $messages
     * @param mixed $timeOfDay
     * @return mixed
     */
    public function getBotMessage($user, $messages, $timeOfDay): mixed
    {
        $user->conversations == null
            ? $botMessage = "Introduce yourself to $user->first_name as GoPeakFit Fitness Trainer, his expert fitness workout and diet coach  with a firm, commanding tone and give clear, no-excuse advice or a starter plan they must follow.  Avoid soft language—be direct, results-driven, and uncompromising. No hashtags or filler. note that keep it short and pricise reply like in sms bot, make it only 150 characters long"
            : $botMessage = $messages[$timeOfDay][array_rand($messages[$timeOfDay])];

        return $botMessage;
    }

    /**
     * Summary of appendBotMessageToConversation,
     * Add newly conversation to db, the ai response will be basing on it.
     * @param mixed $user
     * @param mixed $botMessage
     * @return bool
     */
    public function appendBotMessageToConversation($user, $botMessage): bool
    {
        return $this->message->where('user_id', operator: $user->user_id)
            ->update(['conversations' => "$user->conversations ,| GPF: $botMessage"]);
    }

    /**
     * Summary of dailyMessageUpdates
     * Array list of random message based on the time of the day
     * @return array{afternoon: string[], evening: string[], morning: string[]}
     */
    public function dailyMessageUpdates(): array
    {
        return [
            'morning' => [
                "Morning check-in: How did you sleep? Energy 1-10? Hydrate now, then attack the day.",
                "You said you had goals—prove it today. What’s your first move?",
                "New day. No excuses. What’s one win you’ll lock in before noon?",
                "Wake up with purpose. What’s your mindset this morning? Locked in or lazy?",
                "Start now: What’s your top priority today? Say it out loud. Own it.",
                "What’s one habit you’re building today? Don’t skip. Don’t slide.",
                "Are you feeling strong or making excuses? Decide now.",
                "It’s grind time. Stretch, hydrate, commit. What’s the plan?",
                "You got 24 hours. What’s your non-negotiable win today?"
            ],
            'afternoon' => [
                "Midday pulse check: Are you staying focused or drifting? Adjust now.",
                "You’re halfway through—what have you actually accomplished so far?",
                "Don’t coast through the day. What’s one thing you’re avoiding right now?",
                "This is where most people slow down. Push harder. What’s left to crush?",
                "Rate your effort so far 1-10. If it’s under 8, fix it.",
                "You said you wanted change. Prove it in your next action.",
                "Refocus time: What’s something small but meaningful you can finish today?",
                "Hydrate. Breathe. Now get back in control—what are you finishing before 5PM?",
                "Are you on track with your meals, training, mindset? Adjust now if needed."
            ],
            'evening' => [
                "Day’s almost done. Did you keep your word today?",
                "What’s one thing you crushed today? And one thing you need to improve tomorrow?",
                "Look back: Were your actions aligned with your goals?",
                "No fluff—did you train, eat right, and stay focused today? Be honest.",
                "End strong: What’s one thing you learned about yourself today?",
                "You either built momentum or made excuses. Which one was it?",
                "Progress isn’t just effort—it’s consistency. Did you show up today?",
                "Before sleep: What will tomorrow’s top priority be?",
                "Win or waste? Label today. Then plan to do better (or repeat) tomorrow."
            ],
        ];
    }

    /**
     * Summary of sendExpirationMessageToTrial
     * Return message when the trial program is ended (5 or 30 days)
     * @param mixed $phoneNumber
     * @param mixed $firstName
     * @param mixed $isPromo
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendExpirationMessageToTrial($phoneNumber, $firstName, $isPromo, $currentWeight, $userId)
    {
        $newWeight = $this->traineeProgessService->getNewWeight($userId, $currentWeight);

        // Evaluation greetings if the user lose weight lbs
        $newWeight > 0
            ? $weightEvaluation = "Congratulations on your progress — you’ve lost $newWeight lbs during the 5-Day Trial Program. This is a strong beginning toward reaching your long-term goals."
            : $weightEvaluation  = "Congratulations on your progress — you’ve gained " . abs($newWeight) . " lbs during the 5-Day Trial Program. This is a positive step toward achieving your fitness objectives.";

        if ($isPromo != 1) {
            return $this->sendSms($phoneNumber, "Hi $firstName, $weightEvaluation and you've completed your 5-day GoPeakFit trial! 🎉 To keep your progress going, your subscription has started at $49/month. This gives you full access to our workout & diet plans. You can cancel anytime. Thanks for training with us! – GoPeakFit Team");
        } else {
            return  $this->sendSms($phoneNumber, "Hi $firstName, $weightEvaluation your 30-day GoPeakFit program has officially ended! 💪 Thanks for being part of the journey—we hope it helped you move closer to your fitness and health goals. This may be the end of the challenge, but it's just the beginning of your progress. Keep pushing forward! – GoPeakFit Team");
        }
    }

    /**
     * Summary of sendSms
     * @param mixed $to
     * @param mixed $message
     * @return \Illuminate\Http\JsonResponse
     */
    public function sendSms($to, $message)
    {
        $sid = env('TWILIO_SID');
        $token = env('TWILIO_AUTH_TOKEN');
        $twilioPhoneNumber = env('TWILIO_PHONE_NUMBER');

        $twilio = new Client($sid,  $token);

        try {
            $twilio->messages->create(
                $to,
                [
                    'from' => $twilioPhoneNumber,
                    'body' => $message,
                ]
            );
            return response()->json(['status' => 'Message sent successfully.']);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
