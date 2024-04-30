import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { FormControl, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Textarea } from "@chakra-ui/react";

export default function Addcourse(){

    const {id} = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState(null);

    const [course, setCourse] = useState({
        id: null,
        title: '',
        description: '',
        n_chapters: '',
        level: '',
        chapters : [
            {
                title : '',
                description : ''
            }
        ],
        videos : [
            {
                video1 : '',
                video2 : '',
                video3 : '',
                video4 : '',
                video5 : '',
                video6 : '',
                video7 : '',
                video8 : '',
                video9 : '',
                video10 : '',
            }
        ]
    });

    const Sub = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', course.title);
        formData.append('description', course.description);
        formData.append('level', course.level);
        formData.append('n_chapters', course.n_chapters);

        course.chapters.forEach((chapter, index) => {
            formData.append(`chapters[${index}][title]`, chapter.title);
            formData.append(`chapters[${index}][description]`, chapter.description);
            course.videos.forEach((video, videoIndex) => {
                formData.append(`videos[${videoIndex}][video${videoIndex+1}]`, video);
            })
        });

        axiosClient.post('/profcourse', formData,{
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
        .then(() => {
            console.log('course was successfully added!');
            navigate('/');
        })
        .catch((err) => {
            const response = err.response;
            if (response && response.status === 422) {
                setErrors(response.data.errors);
            }
        });
    };

    return (
        <div className="row" id="mother">
            <form onSubmit={Sub}>
                <div id="div1" className="col-md-6">
                    {course.id && <h1>Update Course : {course.title}</h1>}
                    {!course.id && <h1>New Course</h1>}
                    {errors && (
                        <div className="alert bg-danger text-white">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                </div>
                <div id="div2" className="col-md-6">
                    <FormControl>
                        <label className="form-label">Course title</label>
                        <Input
                            type="text"
                            bg={'white'}
                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                            value={course.title}
                        />
                    </FormControl>
                    <br />
                </div>
                <div id="div3" className="col-md-6">
                    <FormControl>
                        <label className="form-label">Course description</label>
                        <Textarea
                            bg={'white'}
                            onChange={(e) => setCourse({ ...course, description: e.target.value })}
                            value={course.description}
                        />
                    </FormControl>
                    <br />
                </div>
                <div id="div4" className="col-md-6">
                    <FormControl>
                        <label className="form-label">Level</label>
                        <NumberInput value={course.level} min={1}>
                            <NumberInputField
                                bg={'white'}
                                onChange={(e) => setCourse({ ...course, level: e.target.value })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>Enter the level of this course</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <label className="form-label">Number of chapters</label>
                        <NumberInput value={course.n_chapters} min={1} max={5}>
                            <NumberInputField
                                bg={'white'}
                                onChange={(e) => setCourse({ ...course, n_chapters: e.target.value })}
                            />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                        <FormHelperText>Enter the number of chapters that you will add in this course</FormHelperText>
                    </FormControl>
                </div>
                <div id="div4" className="col-md-6">
                {Array.from({ length: course.n_chapters }).map((_, index) => (
                <div key={index}>
                    <FormControl>
                    <label className="form-label">Chapter {index + 1} title</label>
                    <Input
                        type="text"
                        bg={"white"}
                        onChange={(e) =>
                        setCourse((prevCourse) => ({
                            ...prevCourse,
                            chapters: prevCourse.chapters.map((chap, i) =>
                            i === index ? { ...chap, title: e.target.value } : chap
                            ),
                        }))
                        }
                        // value={course.chapters[index]?.title || ""}
                    />
                    </FormControl>
                    <FormControl>
                    <label className="form-label">Chapter {index + 1} description</label>
                    <Textarea
                        bg={'white'}
                        onChange={(e) =>
                        setCourse((prevCourse) => ({
                            ...prevCourse,
                            chapters: prevCourse.chapters.map((chap, i) =>
                            i === index ? { ...chap, description: e.target.value } : chap
                            )
                        }))
                        }
                        // value={course.chapters[index]?.description || ''}
                    />
                    </FormControl>
                    <FormControl>
                    <label className="form-label">Upload Videos for Chapter {index + 1}</label>
                    <Input
                        multiple
                        type="file"
                        accept="video/*"
                        onChange={(e) =>
                        setCourse((prevCourse) => ({
                            ...prevCourse,
                            videos: prevCourse.videos.map((video, i) =>
                            i === index ? { ...video, video: e.target.files[0] } : video
                            )
                        }))
                        }
                    />
                    </FormControl>
                </div>
                ))}
                    <button type="submit" className="bn">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}