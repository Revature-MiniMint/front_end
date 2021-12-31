package com.example.project3.services;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;
import com.amazonaws.services.s3.model.*;
import com.example.project3.entities.Profile;
import com.example.project3.repositories.ProfileRepository;
import org.apache.tomcat.util.http.fileupload.FileUploadException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class ProfileServiceImpl implements ProfileService{

    @Autowired
    private ProfileRepository repository;

    @Override
    public Profile addProfile(Profile profile) {
        return repository.save(profile);
    }

    @Override
    public List<Profile> getAllProfiles() {
        return repository.findAll();
    }

    @Override
    public Profile getProfileByUserId(long id) {
        Optional<Profile> profile = repository.findById(id);
        return profile.get();
    }

    @Override
    public void deleteProfile(long id) {
        repository.deleteById(id);
    }

    //Username and email excluded since those fields do not ever change
    @Override
    public Profile updateProfileByUserId(long id, Profile updateProfile) {
        Profile profileDB = repository.findById(id).get();
        profileDB.setPassword(updateProfile.getPassword());
        profileDB.setName(updateProfile.getName());
        profileDB.setAlias(updateProfile.getAlias());
        profileDB.setGender(updateProfile.getGender());
        profileDB.setDob(updateProfile.getDob());
        profileDB.setBio(updateProfile.getBio());
        profileDB.setProfilepic(updateProfile.getProfilepic());
        profileDB.setPrivacies(updateProfile.getPrivacies());
        repository.save(profileDB);
        return profileDB;
    }

    @Override
    public String uploadProfilePic(long id, MultipartFile image) throws Exception {

        //check that file is image
        if (!image.getContentType().contains("image")) {
            throw new FileUploadException("Invalid file type for profile picture");
        }

        /* Create S3 Client Object */
        AmazonS3 s3 = AmazonS3ClientBuilder
                .standard()
                .withRegion(Regions.US_EAST_1)
                .withCredentials(new AWSStaticCredentialsProvider(
                        // For now you must hardcode the access and secret key in here. These are not present as they cannot be shared on github. Ask James for more info if needed.
                        new BasicAWSCredentials("", "")))
                .build();

        String bucketName = "minimint";
        try {

            //set metadata
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(image.getContentType());
            metadata.setContentLength(image.getSize());

            // create PutObjectRequest object */
            PutObjectRequest request = new PutObjectRequest(bucketName, String.valueOf(id), image.getInputStream(), metadata);
            request.setStorageClass(StorageClass.Standard);
            request.setCannedAcl(CannedAccessControlList.BucketOwnerFullControl);

            // Send put object request
            PutObjectResult result = s3.putObject(request);
            System.out.println("Uploaded profile pic to storage for id: " + id);
            String link = "https://" + bucketName + ".s3.us-east-1.amazonaws.com/" + id;

            //Set profilepic link in db
            Profile dbProfile = repository.getById(id);
            dbProfile.setProfilepic(link);
            repository.save(dbProfile);

            return link;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Failed to upload picture");
        }

        //wont reach here
        throw new Exception("Internal Server Error");
    }
}
