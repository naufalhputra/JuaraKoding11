package com.JodohOnline.main.controller;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.JodohOnline.main.entity.Register;
import com.JodohOnline.main.repository.RegisterRepository;
import com.JodohOnline.main.utility.FileUtility;
import com.google.gson.Gson;

@RestController
@RequestMapping("/register")
public class RegisterController {
	@Autowired
	RegisterRepository RegRepo;
	
	@GetMapping("/")
	public List<Register> getAll(){
		return RegRepo.findAll();
	}
	
	@GetMapping("/login/")
	public Register getByLogin(@RequestParam("username")String username, @RequestParam("phone") String phone) {
		
		return RegRepo.findByLogin(username, phone);
		
	}
	
	@GetMapping("/username/{value}")
	public Register getByUsername(@PathVariable("value") String value) {
		
		return RegRepo.findByUsername(value);
		
	}
	
	@GetMapping(value = "/image/{username}", produces = MediaType.IMAGE_JPEG_VALUE)
	public @ResponseBody byte[] getImageWithMediaType(@PathVariable String username) throws IOException{
		
		final InputStream in = getClass().getResourceAsStream("/user-photo/" + username);
		return IOUtils.toByteArray(in);
		
	}
	
	@GetMapping("/find/")
	public Register getByGender(@RequestParam("gender")String gender) {
		
		return RegRepo.findByGender(gender);
		
	}
	
	@PostMapping("/")
	public String postRegisterUser(@RequestParam(value = "file")MultipartFile image, @ModelAttribute(value = "data") String dataJson) throws IOException {
		
		String fileName = StringUtils.cleanPath(image.getOriginalFilename());
		String uploadDir = "src/main/java/user-photo";
		FileUtility.saveFile(uploadDir, fileName, image);
		Register userData = new Gson().fromJson(dataJson, Register.class);
		userData.setImage(fileName);
		
		RegRepo.save(userData);
		return " Register Successfully!";
		
	}
	
}