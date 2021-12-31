package com.example.project3;

import com.example.project3.entities.Privacy;
import com.example.project3.entities.Profile;
import com.example.project3.repositories.PrivacyRepository;
import com.example.project3.repositories.ProfileRepository;
import com.example.project3.services.PrivacyService;
import com.example.project3.services.ProfileService;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@SpringBootTest
class ProfileRepositoryTest {
	
	@Autowired
    private ProfileRepository repositoryProfile;
    @Autowired
    private PrivacyRepository repositoryPrivacy;
    
    @Autowired
    private ProfileService serviceProfile;
    @Autowired
    private PrivacyService servicePrivacy;
    
    private Profile testProfile1;
    private Profile testProfile2;
    private Privacy testPrivacy1;
    private Privacy testPrivacy2;
    
    @BeforeEach
    public void setup() {
    	testPrivacy1 = Privacy.builder()
                .email(true)
                .dob(false)
                .gender(true)
                .name(false)
                .bio(true)
                .build();
    	testPrivacy2 = Privacy.builder()
                .email(false)
                .dob(true)
                .gender(false)
                .name(true)
                .bio(false)
                .build();
    	testProfile1 = Profile.builder()
    			.username("username")
                .password("password")
                .email("j@gmail.com")
                .name("John Miller")
                .alias("John Doe")
                .dob("2021-12-30")
                .gender("male")
                .bio("Hello World")
                .profilepic("/some_image")
                .privacies(testPrivacy1)
                .build();
    	testProfile2 = Profile.builder()
    			.username("username2")
                .password("password2")
                .email("j@gmail.com2")
                .name("Jane Shepard")
                .alias("Jane Doe")
                .dob("2022-01-01")
                .gender("female")
                .bio("Hello World2")
                .profilepic("/some_image2")
                .privacies(testPrivacy2)
                .build();
    }
    
    @AfterEach
    public void cleanup() {
    	testPrivacy1 = null;
    	testPrivacy2 = null;
    	testProfile1 = null;
    	testProfile2 = null;
    }
    
    public static void assertPrivacyEquals(Privacy test, Privacy privacy) {
    	assertEquals(test.getPrivacyid(), privacy.getPrivacyid());
    	assertEquals(test.getEmail(), privacy.getEmail());
    	assertEquals(test.getDob(), privacy.getDob());
    	assertEquals(test.getGender(), privacy.getGender());
    	assertEquals(test.getName(), privacy.getName());
    	assertEquals(test.getBio(), privacy.getBio());
    }
    
    public static void assertProfileEquals(Profile test, Profile profile) {
    	assertEquals(test.getId(), profile.getId());
        assertEquals(test.getUsername(), profile.getUsername());
        assertEquals(test.getPassword(), profile.getPassword());
        assertEquals(test.getEmail(), profile.getEmail());
        assertEquals(test.getName(), profile.getName());
        assertEquals(test.getAlias(), profile.getAlias());
        assertEquals(test.getDob(), profile.getDob());
        assertEquals(test.getGender(), profile.getGender());
        assertEquals(test.getBio(), profile.getBio());
        assertEquals(test.getProfilepic(), profile.getProfilepic());
    }
    
    @Test
    public void testGetAllPrivacy() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testPrivacy2 = repositoryPrivacy.save(testPrivacy2);
    	List<Privacy> privacyList = new ArrayList<Privacy>();
    	privacyList.add(testPrivacy1);
    	privacyList.add(testPrivacy2);
    	List<Privacy> testList = servicePrivacy.getAllPrivacy();
    	for (int i = 0; i < privacyList.size(); i++) {
    		assertPrivacyEquals(testList.get(i), privacyList.get(i));
    	}
    	repositoryPrivacy.delete(testPrivacy2);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testGetPrivacyById() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testProfile1.setPrivacies(testPrivacy1);
    	testProfile1 = repositoryProfile.save(testProfile1);
    	Privacy test = servicePrivacy.getPrivacyById(testProfile1.getId());
		assertPrivacyEquals(test, testPrivacy1);
    	repositoryProfile.delete(testProfile1);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testUpdatePrivacy() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testPrivacy2 = repositoryPrivacy.save(testPrivacy2);
    	testProfile1.setPrivacies(testPrivacy1);
    	testProfile1 = repositoryProfile.save(testProfile1);
    	testProfile1 = servicePrivacy.updatePrivacy(testProfile1.getId(), testPrivacy2);
		assertPrivacyEquals(testProfile1.getPrivacies(), testPrivacy2);
    	repositoryProfile.delete(testProfile1);
    	repositoryPrivacy.delete(testPrivacy2);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testAddProfile() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testProfile1.setPrivacies(testPrivacy1);
    	Profile testProfile = serviceProfile.addProfile(testProfile1);
    	assertProfileEquals(testProfile, testProfile1);
        Privacy testPrivacy = testProfile.getPrivacies();
		assertPrivacyEquals(testPrivacy, testPrivacy1);
    	repositoryProfile.delete(testProfile1);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testGetAllProfiles() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testPrivacy2 = repositoryPrivacy.save(testPrivacy2);
    	testProfile1.setPrivacies(testPrivacy1);
    	testProfile2.setPrivacies(testPrivacy2);
    	testProfile1 = repositoryProfile.save(testProfile1);
    	testProfile2 = repositoryProfile.save(testProfile2);
    	List<Profile> profileList = new ArrayList<Profile>();
    	profileList.add(testProfile1);
    	profileList.add(testProfile2);
    	List<Profile> testList = serviceProfile.getAllProfiles();
    	for (int i = 0; i < profileList.size(); i++) {
    		assertProfileEquals(testList.get(i), profileList.get(i));
    		assertPrivacyEquals(testList.get(i).getPrivacies(), profileList.get(i).getPrivacies());
    	}
    	repositoryProfile.delete(testProfile2);
    	repositoryProfile.delete(testProfile1);
    	repositoryPrivacy.delete(testPrivacy2);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testGetProfileByUserId() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testProfile1.setPrivacies(testPrivacy1);
    	testProfile1 = repositoryProfile.save(testProfile1);
    	Profile test = serviceProfile.getProfileByUserId(testProfile1.getId());
    	assertProfileEquals(test, testProfile1);
    	repositoryProfile.delete(testProfile1);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testDeleteProfile() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testProfile1.setPrivacies(testPrivacy1);
    	testProfile1 = repositoryProfile.save(testProfile1);
    	serviceProfile.deleteProfile(testProfile1.getId());
    	Optional<Profile> test = repositoryProfile.findById(testProfile1.getId());
    	assertFalse(test.isPresent());
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
    @Test
    public void testUpdateProfileByUserId() {
    	testPrivacy1 = repositoryPrivacy.save(testPrivacy1);
    	testProfile1.setPrivacies(testPrivacy1);
    	testProfile2.setPrivacies(testPrivacy1);
    	testProfile1 = repositoryProfile.save(testProfile1);
    	testProfile1 = serviceProfile.updateProfileByUserId(testProfile1.getId(), testProfile2);
    	testProfile2.setId(testProfile1.getId());
    	testProfile2.setUsername(testProfile1.getUsername());
    	testProfile2.setEmail(testProfile1.getEmail());
    	assertProfileEquals(testProfile1, testProfile2);
    	repositoryProfile.delete(testProfile1);
    	repositoryPrivacy.delete(testPrivacy1);
    }
    
}
