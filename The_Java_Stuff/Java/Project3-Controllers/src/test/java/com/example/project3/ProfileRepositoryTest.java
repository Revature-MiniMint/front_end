package com.example.project3;

import com.example.project3.entities.Privacy;
import com.example.project3.entities.Profile;
import com.example.project3.repositories.PrivacyRepository;
import com.example.project3.repositories.ProfileRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class ProfileRepositoryTest {

    @Autowired
    private ProfileRepository repository2;

    @Autowired
    private PrivacyRepository repository3;

    //comment out save or delete to test those individually
    //leave privacy as an unused, high number to ensure extra values are not tacked on
    //any values from 1 to 32 will overwrite the defaults and should not be used
    @Test
    public void savePrivacy(){
        Privacy privacy = Privacy.builder()
                .email(true)
                .dob(false)
                .gender(true)
                .name(true)
                .bio(false)
                .build();
        repository3.save(privacy);
        repository3.delete(privacy);
    }

    //Will succeed if the entry is new and fail if username or email are repeats in the database
    @Test
    public void saveProfile() {
        Privacy privacy = new Privacy();
        privacy.setPrivacyid(1L);
        Profile profile = Profile.builder()
                .username("will4456b") //change this for repeat tests
                .password("password")
                .email("wjbecht434652be@gmail.com") //change this for repeat tests
                .name("will bechtle")
                .alias("wjb")
                .dob("06/17/1998")
                .gender("male")
                .bio("hello im will")
                .profilepic("/some_image")
                .privacies(privacy)
                .build();
        repository2.save(profile);
    }

    //this test doesn't quite work yet, it is a troubled boy
//    @Test
//    public void listProfiles() {
//        List<Profile> profiles = repository2.findAll();
//        long i = profiles.get(0).getId();
//        assert equals(i = 1);
//    }

}
