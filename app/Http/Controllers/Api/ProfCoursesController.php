<?php

namespace App\Http\Controllers\Api;

use App\Models\Prof;
use App\Models\Video;
use App\Models\Course;
use App\Models\Chapter;
use App\Models\Categorie;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\CourseResource;

class ProfCoursesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $id = Auth::user()->id;
        $prof_id = Prof::where("user_id", $id)->first()->id;
        $courses = Course::where('prof_id', $prof_id)->orderBy('created_at', 'desc')->get();
        return CourseResource::collection($courses);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $id = Auth::user()->id;
        $prof_id = Prof::where("user_id", $id)->first()->id;
        $validatedData = $request->validate([
            'title' => 'required|string|max:150',
            'description' => 'required',
            'level' => 'required|string',
            'n_chapters' => 'required|numeric',
            'chapters.*.title' => 'required|string|max:150',
            'chapters.*.description' => 'required',
            'chapters.*.videos.*' => 'nullable|file|mimes:mp4|max:5000000',
            'videos.*.video1' => 'required|max:5000000',
            // 'videos.*.video2' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video3' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video4' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video5' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video6' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video7' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video8' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video9' => 'nullable|mimes:mp4|max:5000000',
            // 'videos.*.video10' => 'nullable|mimes:mp4|max:5000000',
        ]);

    // Store course details
    $course = Course::create([
        'title' => $validatedData['title'],
        'description' => $validatedData['description'],
        'level' => $validatedData['level'],
        'n_chapters' => $validatedData['n_chapters'],
        'prof_id' => $prof_id,
    ]);

    // Store chapter details
    foreach ($validatedData['chapters'] as $chapterData) {
        $chapter = Chapter::create([
            'title' => $chapterData['title'],
            'description' => $chapterData['description'],
            'course_id' => $course->id,
        ]);
        foreach ($chapterData['videos'] as $videoData) {
            $video = Video::create([
                'video1' => $videoData['video1'],
                'video2' => $videoData['video2'],
                'video3' => $videoData['video3'],
                'video4' => $videoData['video4'],
                'video5' => $videoData['video5'],
                'video6' => $videoData['video6'],
                'video7' => $videoData['video7'],
                'video8' => $videoData['video8'],
                'video9' => $videoData['video9'],
                'video10' => $videoData['video10'],
                'chapter_id' => $chapter->id
            ]);
            if ($videoData !== null){
                $fileName = time().'.'.$videoData->getClientOriginalExtension();
                $video->move(public_path('assets'), $fileName);
            }
        }
        }
                // foreach ($chapterData['videos'] as $video) {
            // $path = $video->store('videos');
            // $chapter->videos()->create(['path' => $path]);
        //  if ($video !== null) { // Check if $video is not null
        // $fileName = time().'.'.$video->getClientOriginalExtension();
        // $video->move(public_path('assets'), $fileName);
    // }
    // }

        return response()->json(['message' => 'Course created successfully'], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function getMyCourses()
    {
        $courses = Course::orderBy('created_at', 'desc')->get();
        return CourseResource::collection($courses);
    }
}
