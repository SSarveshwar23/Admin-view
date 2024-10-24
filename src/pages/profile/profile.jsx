import React, { useEffect, useContext, useRef } from 'react';
import { AppSettings } from './../../config/app-settings.js';
import PhotoSwipeLightbox from 'photoswipe/lightbox';
import 'photoswipe/style.css';
import 'lity';
import 'lity/dist/lity.min.css';

function ExtraProfile() {
    const context = useContext(AppSettings);
    let lightboxRef = useRef(null);

    useEffect(() => {
        context.handleSetAppContentClass('p-0');

        if (!lightboxRef.current) {
            lightboxRef.current = new PhotoSwipeLightbox({
                gallery: '.gallery-v2',
                children: 'a',
                pswpModule: () => import('photoswipe'),
            });
            lightboxRef.current.init();
        }

        return () => {
            context.handleSetAppContentClass('');
            if (lightboxRef.current) {
                lightboxRef.current.destroy();
                lightboxRef.current = null;
            }
        };

        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="profile">
                <div className="profile-header">
                    <div className="profile-header-cover"></div>
                    <div className="profile-header-content">
                        <div className="profile-header-img">
                            <img src="/assets/img/user/user-13.jpg" alt="profile" />
                        </div>
                        <div className="profile-header-info">
                            <h4 className="mt-0 mb-1">Sean Ngu</h4>
                            <p className="mb-2">UXUI + Frontend Developer</p>
                            <a href="#/" className="btn btn-xs btn-yellow">Edit Profile</a>
                        </div>
                    </div>
                    <ul className="profile-header-tab nav nav-tabs">

                        <li className="nav-item"><a href="#profile-about" className="nav-link" data-bs-toggle="tab">ABOUT</a></li>
                    </ul>
                </div>
            </div>
            <div className="profile-content">
                <div className="tab-content p-0">
                    <div className="tab-pane fade show active" id="profile-about">
                        <div className="table-responsive form-inline">
                            <table className="table table-profile align-middle">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>
                                            <h4>Sean Ngu <small>UXUI + Frontend Developer</small></h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr className="highlight">
                                        <td className="field">Mood</td>
                                        <td><a href="#/" className="text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Add Mood Message</a></td>
                                    </tr> */}
                                    <tr className="divider">
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr>
                                        <td className="field">Mobile</td>
                                        <td><i className="fa fa-mobile fa-lg me-5px"></i> +1-(847)- 367-8924 <a href="#/" className="ms-5px text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Edit</a></td>
                                    </tr>
                                    <tr>
                                        <td className="field">Home</td>
                                        <td><a href="#/" className="text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Add Number</a></td>
                                    </tr>
                                    <tr>
                                        <td className="field">Office</td>
                                        <td><a href="#/" className="text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Add Number</a></td>
                                    </tr>
                                    <tr className="divider">
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">About Me</td>
                                        <td><a href="#/" className="text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Add Description</a></td>
                                    </tr>
                                    <tr className="divider">
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr>
                                        <td className="field">Country/Region</td>
                                        <td>
                                            <select className="form-select w-200px" name="region">
                                                <option value="US" defaultValue>United State</option>
                                                <option value="AF">Afghanistan</option>
                                                <option value="AL">Albania</option>
                                                <option value="DZ">Algeria</option>
                                                <option value="AS">American Samoa</option>
                                                <option value="AD">Andorra</option>
                                                <option value="AO">Angola</option>
                                                <option value="AI">Anguilla</option>
                                                <option value="AQ">Antarctica</option>
                                                <option value="AG">Antigua and Barbuda</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="field">City</td>
                                        <td>Los Angeles</td>
                                    </tr>
                                    <tr>
                                        <td className="field">State</td>
                                        <td><a href="#/" className="text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Add State</a></td>
                                    </tr>
                                    <tr>
                                        <td className="field">Website</td>
                                        <td><a href="#/" className="text-decoration-none fw-bold"><i className="fa fa-plus fa-fw"></i> Add Webpage</a></td>
                                    </tr>
                                    <tr>
                                        <td className="field">Gender</td>
                                        <td>
                                            <select className="form-select w-200px" name="gender">
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="field">Birthdate</td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <select className="form-select w-80px" name="day">
                                                    <option value="04" defaultValue>04</option>
                                                </select>
                                                <span className="mx-2">-</span>
                                                <select className="form-select w-80px" name="month">
                                                    <option value="11" defaultValue>11</option>
                                                </select>
                                                <span className="mx-2">-</span>
                                                <select className="form-select w-100px" name="year">
                                                    <option value="1989" defaultValue>1989</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="field">Language</td>
                                        <td className="with-form-control">
                                            <select className="form-select w-200px" name="language">
                                                <option value="" defaultValue>English</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr className="divider">
                                        <td colSpan="2"></td>
                                    </tr>
                                    <tr className="highlight">
                                        <td className="field">&nbsp;</td>
                                        <td className="">
                                            <button type="submit" className="btn btn-primary w-150px">Update</button>
                                            <button type="submit" className="btn border-0 w-150px ms-5px">Cancel</button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExtraProfile;