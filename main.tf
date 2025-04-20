provider "aws" {
    region = "us-east-1"
    #revisar region
}
resource "aws_vpc" "vpc_avance_devops" {
    cidr_block = "198.168.0.0/20"
    enable_dns_hostnames = true
    enable_dns_support = true
    tags = {
        Name = "vpc_avance_devops"
    }
  
}

resource "aws_subnet" "public_subnet" {
    vpc_id = aws_vpc.vpc_avance_devops.id #vpc id
    cidr_block = "198.168.0.0/24"
    map_public_ip_on_launch = true  
    tags = {
        Name = "public_subnet"
    }
  
}

resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.vpc_avance_devops.id #vpc id
    tags = {
        Name = "igw"
    }
  
}
resource "aws_route_table" "public_route_table" {
    vpc_id = aws_vpc.vpc_avance_devops.id #vpc id
    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id 
    }
    tags = {
        Name = "public_route_table"
    }
}

resource "aws_security_group" "sg-windows-jumpserv" {
    vpc_id = aws_vpc.vpc_avance_devops.id #vpc id
    name = "SG-windows-jumpserver"
    description = "Security group for Windows Jump Server"

    #ssh ingress and egress rules
    ingress  {
        from_port = 22
        to_port = 22
        protocol = "tcp"
        cidr_blocks = [ "0.0.0.0/0" ]

  
}
egress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [ "198.168.0.0/24" ] #subnet id
}
tags = {
    Name = "sg-windows-jumpserver"

}
}
resource "aws_security_group" "sg-linux-webserver" {
  vpc_id = aws_vpc.vpc_avance_devops.id #vpc id
  name = "SG-linux-webserver"
  description = "Security group para servidor web Linux"
  ingress {
    from_port = 22
    to_port = 22
    protocol = "tcp"
    cidr_blocks = [ "198.168.0.0/24" ] #subnet id

  }
  ingress {
    from_port = 80
    to_port = 80
    protocol = "tcp"
    cidr_blocks = [ "0.0.0.0/0" ] #subnet id 
 }
    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = [ "0.0.0.0/0" ] #subnet id

}
    tags = {
        Name = "sg-linux-webserver"
    }
    }

resource "aws_instance" "windows-jumpserver" {
    ami = "ami-0c765d44cf1f25d26" #ami id
    instance_type = "t2.medium"
    subnet_id = aws_subnet.public_subnet.id #subnet id
    vpc_security_group_ids = [aws_security_group.sg-windows-jumpserv.id] #sg id
    key_name = "vokey" #key pair name
    tags = {
        Name = "windows-jumpserver"
    }
  
}

resource "aws_instance" "linux-webserver" {
    ami = "ami-084568db4383264d4" #amazon linux 2
    instance_type = "t2.micro"
    subnet_id = aws_subnet.public_subnet.id #subnet id
    vpc_security_group_ids = [aws_security_group.sg-linux-webserver.id] #sg id
    key_name = "vokey" #key pair name
    tags = {
        Name = "linux-webserver"
    }
  
}


#output 
output "windows-jumpserver_public_ip" {
    value = aws_instance.windows-jumpserver.public_ip
    description = "ip publica de la instancia windows-jumpserver"
}
output "linux-webserver_public_ip" {
    value = aws_instance.linux-webserver.public_ip
    description = "ip publica de la instancia linux-webserver"
}