package com.example.project3.repositories;

import com.example.project3.entities.Privacy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PrivacyRepository extends JpaRepository<Privacy, Long>{

    @Query(
            value = "select privacyid from privacy where email = ?1 and dob = ?2 and gender = ?3 and name = ?4 and bio = ?5",
            nativeQuery = true
    )
    long getPrivacy(boolean email, boolean dob, boolean gender, boolean name, boolean bio);
}
